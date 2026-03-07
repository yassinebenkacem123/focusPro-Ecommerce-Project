const SetQuantity = (
   {
    quantity,
    cardCounter,
    
   }:{
    quantity: number;
    cardCounter: boolean;
}
) => {
    return (
        <span className='text-xl bg-stone-200/80 w-30 p-2 rounded-lg text-center font-medium'>
            {
                cardCounter ? quantity : quantity
            }
        </span>
    )


}

export default SetQuantity;