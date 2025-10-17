'use client'

import axios from 'axios'
import {MapPin, X} from 'lucide-react'
import React, {forwardRef, useEffect, useRef, useState} from 'react'

import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label'
import {useDebounce} from '@/hooks/use-debounce'
import {City, useSearchCitiesLazyQuery} from '@/services/graphql/generated/graphql'

interface InputPlaceProps {
    onPlaceSelected: (data: {
        placeDetails: any
        city: City | null
    }) => void
    onReset: () => void
    autoFocus?: boolean
    label?: string
    className?: string
    showClearBtn?: boolean
    required?: boolean
    defaultValue?: string
    placeholder?: string
    placeTypes?: string[]
}

const InputGooglePlace = forwardRef<HTMLInputElement, InputPlaceProps>(
    (
        {
            autoFocus,
            label,
            className,
            showClearBtn = true,
            required,
            defaultValue,
            placeholder = 'Rechercher une adresse',
            placeTypes,
            onPlaceSelected,
            onReset
        },
        ref
    ) => {
        const [inputValue, setInputValue] = useState<string>('')
        const [results, setResults] = useState<google.maps.places.QueryAutocompletePrediction[]>([])
        const [isPlaceSelected, setIsPlaceSelected] = useState<boolean>(false)
        const inputRef = useRef<HTMLInputElement | null>(null)
        const debouncedValue = useDebounce(inputValue, 500)

        const [searchCities] = useSearchCitiesLazyQuery()

        useEffect(() => {
            if (isPlaceSelected || debouncedValue.trim() === '') return

            const fetchResults = async () => {
                try {
                    const res = await axios.post('/api/google/places', {
                        query: debouncedValue,
                        types: placeTypes ?? 'address'
                    })
                    setResults(res.data.results)
                } catch (error) {
                    console.error('Erreur lors de la récupération des résultats :', error)
                }
            }

            fetchResults()
        }, [debouncedValue, isPlaceSelected])

        const handleInputChange = (value: string) => {
            setInputValue(value)
            setIsPlaceSelected(false)
        }

        const handleReset = () => {
            setInputValue('')
            setResults([])
            inputRef.current?.focus()
            onReset()
        }

        const handleSelectPlace = async (
            place: google.maps.places.QueryAutocompletePrediction
        ) => {
            setInputValue(place.description)
            setIsPlaceSelected(true)
            setResults([])

            try {
                const res = await axios.post('/api/google/place-details', {
                    placeId: place.place_id
                })
                const placeDetails = res.data

                const components = placeDetails?.address_components || []

                const cityName =
                    components.find((c: any) => c.types.includes('locality'))?.long_name || ''
                const zip =
                    components.find((c: any) => c.types.includes('postal_code'))?.long_name || ''
                const lat = placeDetails?.geometry?.location?.lat
                const lng = placeDetails?.geometry?.location?.lng

                let city = null

                if (cityName || zip || (lat && lng)) {
                    const {data} = await searchCities({
                        variables: {
                            dto: {
                                name: cityName || undefined,
                                zip: zip || undefined,
                                latitude: lat,
                                longitude: lng
                            }
                        },
                        fetchPolicy: 'network-only'
                    })

                    if (data?.searchCities.length) {
                        city = {
                            id: data.searchCities[0].id,
                            name: data.searchCities[0].name,
                            zip: data.searchCities[0].zip
                        } as City
                    }
                }

                onPlaceSelected({placeDetails, city})
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du lieu :', error)
            }
        }

        useEffect(() => {
            if (defaultValue && defaultValue !== '') {
                setInputValue(defaultValue)
                setIsPlaceSelected(true)
            }
        }, [defaultValue])

        return (
            <div className="relative">
                {label && (
                    <Label className={'mb-2'}>
                        {label} <span className="text-red-500">{required && '*'}</span>
                    </Label>
                )}
                <div className="relative">
                    <Input
                        autoFocus={autoFocus}
                        ref={(node) => {
                            inputRef.current = node
                            if (typeof ref === 'function') {
                                ref(node)
                            } else if (ref) {
                                ref.current = node
                            }
                        }}
                        placeholder={placeholder}
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                    {showClearBtn && inputValue !== '' && (
                        <div
                            onClick={handleReset}
                            className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                        >
                            <X className="h-5 w-5 text-neutral-700"/>
                        </div>
                    )}
                </div>
                <div>
                    {results.length > 0 && (
                        <div
                            className="absolute mt-1 w-full divide-y rounded-b-lg bg-white shadow-2xl md:max-h-[300px] md:overflow-y-auto"
                            style={{zIndex: 9999}}>
                            {results.map((place) => (
                                <div
                                    onClick={() => handleSelectPlace(place)}
                                    key={place.place_id}
                                    className="flex cursor-pointer items-center gap-3 p-3 transition hover:bg-neutral-50"
                                >
                                    <MapPin
                                        size={16}
                                        className="h-[16px] min-h-[16px] w-[16px] min-w-[16px] text-primary"
                                    />
                                    <div>
                                        <div className="text-sm font-light">{place.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
)
InputGooglePlace.displayName = 'InputGooglePlace'

export {InputGooglePlace}
