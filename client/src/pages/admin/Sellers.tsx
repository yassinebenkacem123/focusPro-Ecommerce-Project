// to add later : table's pagination.
import {
  AdminSellersFilter,
  AdminSellersList,
  AdminSellersStatistics,
} from "../../components/adminComponents/adminSellersComponents/exportAdminSellersComponents";
export interface SellersProp {
  sellerName: string;
  sellerEmail:string;
  sellerImage?:string;
  status:string;
  numberOfProducts?:number;
  sales?:number;
  rating?:number;
  dateOfRegistration?:string;
}
const Sellers = () => {
  const sellers:SellersProp[] = [
        {
          sellerName:"yassine ben kacem",
          sellerImage:"https://placehold.co/400",
          sellerEmail:"yassine.benkacem@example.com",
          status:"active",
          numberOfProducts:10,
          sales:1000,
          rating:4.3,
          dateOfRegistration:"2023-01-15",
        },
        {
          sellerName:"sara almeida",
          sellerImage:"https://placehold.co/400",
          sellerEmail:"sara.almeida@example.com",
          status:"suspended",
          numberOfProducts:5,
          sales:500,
          rating:4.0,
        },
        {
          sellerName:"mohamed el amine",
          sellerImage:"https://placehold.co/400",
          sellerEmail:"mohamed@gmail.com",
          status:"active",
          numberOfProducts:20,
          sales:2000,
          rating:4.8,
          dateOfRegistration:"2022-11-20",

        },
        {
          sellerName:"lina rodriguez",
          sellerImage:"https://placehold.co/400", 
          sellerEmail:"lina@gmail.com",
          status:"pending",
          numberOfProducts:0,
          sales:0,
          rating:0,
          dateOfRegistration:"2023-03-10",
        },
        {
          sellerName:"ahmed ben ali",
          sellerImage:"https://placehold.co/400",
          sellerEmail:"ahmed.benali@example.com",
          status:"active",
          numberOfProducts:15,
          sales:1500,
          rating:4.5,
          dateOfRegistration:"2023-02-28",
        }
    ]
  return (
    <section className="px-10 py-5 flex flex-col gap-5">
      <AdminSellersStatistics  sellers={sellers}/>
      <AdminSellersFilter />
      <AdminSellersList sellers={sellers}/>
    </section>
  )
}

export default Sellers
