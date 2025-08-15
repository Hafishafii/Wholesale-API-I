import AccountSetting from "./AccountSetting"
import Order from "./Order"
import Personatizations from "./Personatizations"

const UserAccountPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
            <div className="max-w-[1000px] mx-auto p-4 ">
                <Order />
                <AccountSetting/>
                <Personatizations/>
            </div>
        </div>
    )
}

export default UserAccountPage