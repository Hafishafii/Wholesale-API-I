import StackHeaderLayout from '../components/layouts/StackHeaderLayout'
import { OrderRequestsList } from '../features/customize-order'

const CustomizedOrderRequests = () => {
  return (
    <StackHeaderLayout title='Your Order Requests'>
      <OrderRequestsList />
    </StackHeaderLayout>
  )
}

export default CustomizedOrderRequests
