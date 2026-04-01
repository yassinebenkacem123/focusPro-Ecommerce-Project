import { useParams } from "react-router-dom"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SellerInfo from "../../components/adminComponents/adminSellerManagement/SellerInfo"
import SellerPerformanceOverview from "../../components/adminComponents/adminSellerManagement/SellerPerformanceOverview";
import SellerActivitiesLog from "../../components/adminComponents/adminSellerManagement/SellerActivitiesLog";
import SellerGrapthForEarnings from "../../components/adminComponents/adminSellerManagement/SellerGrapthForEarnings";
import SellerProductsTableOnAdmin from "../../components/adminComponents/adminSellerManagement/SellerProductsTableOnAdmin";
import SellerCommunicationOptionsModal from "../../components/adminComponents/adminSellerManagement/SellerCommunicationOptionsModal";
import SellerEmailComposerModal from "../../components/adminComponents/adminSellerManagement/SellerEmailComposerModal";
import AdminSellingCommunication from "../../components/adminComponents/adminSellerManagement/AdminSellingCommunication";

export interface SellerInfosProps {
    sellerId: string | undefined;
    sellerName: string;
    sellerImage: string;
    email: string;
    phoneNumber: string;
    sellerAddress: string;
    registrationDate: string;
    status?: string;
}
export interface SellerPerformanceProps {
    totalSales: number;
    totalRevenue: number;
    averageRating: number;
    earningsThisMonth: number;
}

export interface SellerActivityProps {
    id: number;
    type: string;
    description: string;
    date: string;

}
export interface SellerEarningsStatisticsProps {
    month: string;
    earnings: number;
}

export interface SellerProductProps {
    productId: number;
    productName: string;
    price: number;
    productImage: string;
    category: string;
    quentity: number;
    status: string;
    rating: number;
    sales: number;
}
const AdminSellerManagement = () => {
    const { sellerId } = useParams()
    const [showCommunicationOptions, setShowCommunicationOptions] = useState(false);
    const [showEmailComposer, setShowEmailComposer] = useState(false);
    const [showInternalChat, setShowInternalChat] = useState(false);

    const handleOpenCommunicationOptions = () => {
        setShowCommunicationOptions(true);
    };

    const handleOpenInternalChat = () => {
        setShowCommunicationOptions(false);
        setShowEmailComposer(false);
        setShowInternalChat(true);
    };

    const handleOpenEmailComposer = () => {
        setShowCommunicationOptions(false);
        setShowEmailComposer(true);
    };
    const sellerInfos: SellerInfosProps  = {
        sellerId,
        sellerName: "Yassine Ben Kacem",
        sellerImage:"https://placehold.co/400",
        email:"yassine@gamil.com",
        phoneNumber:"+216 12345678",
        registrationDate:"2021-01-01",
        sellerAddress:"123 Main St, City, Country",
        status:"active",

    }
    const sellerPerformance: SellerPerformanceProps = {
        totalSales: 150,
        totalRevenue: 50000,
        averageRating: 4.5,
        earningsThisMonth: 8000,
    }

    const activities: SellerActivityProps[] = [
        {
            id:1,
            type:"product_added",
            description:"Added new product: iPhone 12",
            date:"2024-06-01T10:30:00Z",
        },
        {
            id:2,  
            type:"product_updated",
            description:"Updated product: Samsung Galaxy S21",
            date:"2024-06-02T14:45:00Z",
        },
        {
            id:3,
            type:"order_received",
            description:"Received new order #12345",
            date:"2024-06-03T09:15:00Z",
        },
        {
            id:4,
            type:"product_removed",
            description:"Removed product: Sony WH-1000XM4",
            date:"2024-06-04T16:20:00Z",
        }
    
    ]

    const sellerEarningsStatistics: SellerEarningsStatisticsProps[] = [
        { month: "January", earnings: 5000 },
        { month: "February", earnings: 7000 },
        { month: "March", earnings: 6000 },
        { month: "April", earnings: 8000 },
        { month: "May", earnings: 7500 },
        { month: "June", earnings: 9000 },
        { month: "July", earnings: 8500 },
        { month: "August", earnings: 9500 },
        { month: "September", earnings: 8000 },
        { month: "October", earnings: 10000 },
        { month: "November", earnings: 9000 },
        { month: "December", earnings: 11000 },
        { month: "January", earnings: 5000 },
        { month: "February", earnings: 7000 },
        { month: "March", earnings: 6000 },
        { month: "April", earnings: 8000 },
        { month: "May", earnings: 7500 },
        { month: "June", earnings: 9000 },
        { month: "July", earnings: 8500 },
        { month: "August", earnings: 9500 },
        { month: "September", earnings: 8000 },
        { month: "October", earnings: 10000 },
        { month: "November", earnings: 9000 },
        { month: "December", earnings: 11000 },
    ];

    const sellerProducts: SellerProductProps[] = [
        {
            productId:1,
            productName:'iPhone 12',
            price: 999,
            productImage:"https://placehold.co/400x400",
            category: 'Electronics',
            quentity: 50,
            status: 'In Stock',
            sales: 120,
            rating: 4.5,
        },
        {
            productId:2,
            productName:'Samsung Galaxy S21',
            price: 899,
            productImage:"https://placehold.co/400x400",
            category: 'Electronics',
            quentity: 30,
            status: 'In Stock',
            sales: 80,
            rating: 4.2,
        },
        {
            productId:3,
            productName:'Sony WH-1000XM4',
            price: 349,
            productImage:"https://placehold.co/400x400",
            category: 'Electronics',
            quentity: 20,
            status: 'In Stock',
            sales: 50,
            rating: 4.7,
        },
        {
            productId:4,
            productName:'Apple Watch Series 6',
            price: 399,
            productImage:"https://placehold.co/400x400",
            category: 'Electronics',
            quentity: 15,
            status: 'In Stock',
            sales: 30,
            rating: 4.6,
         },
         {
            productId:5,
            productName:'MacBook Pro 16"',
            price: 2399,
            productImage:"https://placehold.co/400x400",
            category: 'Electronics',
            quentity: 10,
            status:'Out Of Stock',
            sales: 20,
            rating: 4.8,
        },
        {
            productId:6,
            productName:'iPad Pro 11"',
            price: 799,
            productImage:"https://placehold.co/400x400",
            category: 'Electronics',
            quentity: 25,
            status: 'In Stock',
            sales: 40,
            rating: 4.4,

        },
        {
            productId:7,
            productName:'AirPods Pro',
            price: 249,
            productImage:"https://placehold.co/400x400",
            category: 'Electronics',
            quentity: 40,
            status: 'In Stock',
            sales: 60,
            rating: 4.5,
        }
    ]
    
    return (
        <section className="w-full flex flex-col px-10 py-5 gap-4 items-start">
            <div className="flex  gap-5 w-full">
                {/* seller information */}
                <SellerInfo sellerInfos={sellerInfos} onSendMessageClick={handleOpenCommunicationOptions} />
                {/* seller graph for showing the earnings per month */}
                <SellerGrapthForEarnings sellerEarningsStatistics={sellerEarningsStatistics} />

            </div>

            <div className="flex gap-5 w-full">
               
                <div className="flex flex-col gap-4 w-[40%]">
                    
                    {/* seller performance overview */}
                    <SellerPerformanceOverview sellerPerformance={sellerPerformance} />
                    {/* seller activities log */}
                    <SellerActivitiesLog activities={activities} />
                </div>
                {/* table of seller products */}
                <SellerProductsTableOnAdmin sellerProducts={sellerProducts} />
            </div>

            {showCommunicationOptions && (
                <SellerCommunicationOptionsModal
                    sellerName={sellerInfos.sellerName}
                    onClose={() => setShowCommunicationOptions(false)}
                    onChooseChat={handleOpenInternalChat}
                    onChooseEmail={handleOpenEmailComposer}
                />
            )}

            {showEmailComposer && (
                <SellerEmailComposerModal
                    sellerName={sellerInfos.sellerName}
                    sellerEmail={sellerInfos.email}
                    onClose={() => setShowEmailComposer(false)}
                />
            )}

            <AnimatePresence>
                {showInternalChat && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 p-4 backdrop-blur-[2px]"
                        onClick={() => setShowInternalChat(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <motion.div
                            className="w-full max-w-4xl"
                            onClick={(event) => event.stopPropagation()}
                            initial={{ opacity: 0, y: 16, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.24, ease: "easeOut" }}
                        >
                            <AdminSellingCommunication
                                sellerName={sellerInfos.sellerName}
                                onClose={() => setShowInternalChat(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
  )
}

export default AdminSellerManagement
