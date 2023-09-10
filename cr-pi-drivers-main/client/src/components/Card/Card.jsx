import './Card.css'
import { Link } from 'react-router-dom';



const Card = ({id, name, surname, image, teams, Teams}) => {
    return(
        <div className='Card'>
            <Link to = {`/Detail/${id}`}>
                <h1>{name} {surname}</h1>
                 <img src={image} alt={`${name} ${surname}`} />
                <p>{teams || Teams}</p>       
            </Link>         
        </div>
    )
}

export default Card