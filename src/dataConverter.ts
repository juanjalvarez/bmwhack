import data from './data.json'

const dealerMap: Record<string, typeof data.data.getInventory.dealerInfo[0]> = {}

const fillDealerMap = () => {
    data.data.getInventory.dealerInfo.forEach(dealer => {
        dealerMap[dealer.centerID] = dealer
    })
}

fillDealerMap()

export type CarItemObject = {
    modelYear: number
    bodyStyle: string
    price: number
    vin: string
    link?: string
    imgURL: string
    orderStatus: string
    location: string
}

const generateData = () => data.data.getInventory.result.map<CarItemObject>(item => {
    const dealer = dealerMap[item.dealerId]
    const address = dealer.newVehicleSales[0].address[0]
    return {
        modelYear: item.modelYear,
        bodyStyle: item.bodyStyle.name,
        price: item.totalMsrp,
        vin: item.vin,
        link: item.vehicleDetailsPage,
        imgURL: item.initialCOSYURL,
        orderStatus: item.orderStatus,
        location: `${address.city}, ${address.state}`
    }
})

export const carList = generateData()
