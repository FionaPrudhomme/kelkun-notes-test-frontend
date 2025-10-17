export const OrSeparator = () => {
    return (
        <div className={'grid grid-cols-12 items-center'}>
            <div className={'h-[1px] bg-black/10 col-span-5'}></div>
            <div
                className={'col-span-2 text-center text-muted-foreground/50 text-sm uppercase'}>ou
            </div>
            <div className={'h-[1px] bg-black/10 col-span-5'}></div>
        </div>
    )
}
