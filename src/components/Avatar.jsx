export const Avatar = ({ user }) => {
    return (
        <div className='d-flex align-items-center'>
            <img className='avatar' src={user.image.png} alt="avatar" />
            <p className='fw-bold text-dark-blue d-inline ms-3 mb-0'>{user.username}</p>
        </div>
    )
}