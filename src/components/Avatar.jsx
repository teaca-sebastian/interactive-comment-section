import Badge from 'react-bootstrap/Badge'

export const Avatar = ({ user, isAuthor = false }) => {
    return (
        <div className='d-flex align-items-center'>
            <img className='avatar' src={user.image.png} alt="avatar" />
            <p className='fw-bold text-dark-blue d-inline ms-3 mb-0'>{user.username} {isAuthor && <Badge bg='blue' className='rounded-0 ms-1 align-middle'>you</Badge>}</p>
        </div>
    )
}