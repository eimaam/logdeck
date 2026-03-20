import type { IUser } from "@logdeck/shared"
import { Avatar as AntdAvatar } from "antd"
import type { FC } from "react"
import { generateAvatarMeta } from "../../utils/avatar"
import { useUser } from "../../features/auth/hooks/useAuth"

interface IUserAvatarProps {
  user?: IUser | Partial<IUser>
  showOnlineStatus?: boolean
}

const UserAvatar: FC<IUserAvatarProps> = ({ user, showOnlineStatus = false }) => {
  const currentUser = useUser()
  let userFullName = currentUser?.fullName as string
  let userAvatar = currentUser?.avatarUrl

  if (user) {
    userFullName = user.fullName as string
    userAvatar = user.avatarUrl
  }

  if (!userAvatar) {
    const generatedAvatarInfo = generateAvatarMeta(userFullName)

    return (
      <div className="relative w-8 h-8">
        <AntdAvatar style={{ backgroundColor: generatedAvatarInfo.backgroundColor }} className="border border-border-default!">
          {generatedAvatarInfo.initials}
        </AntdAvatar>
        {showOnlineStatus && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>
    )

  }

  return (
    <div className="relative w-8 h-8">
      <AntdAvatar src={userAvatar} />
      {showOnlineStatus && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  )
}

export default UserAvatar