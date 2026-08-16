import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './favoritos.css'
import api from '../../services/api';

  import { toast } from 'react-toastify';

function Favoritos() {
    const [favorito,setFavorito] =useState([]);

    useEffect(()=>{
        let meusPokemons = localStorage.getItem("@pokeSalvo");
        setFavorito(JSON.parse(meusPokemons)||[])
    },[])

    const excluir=(pokemon)=>{
        let meusPokemons = favorito.filter((itemNovo)=>{
            return(itemNovo.id !== pokemon.id)
        })

        setFavorito(meusPokemons)

        localStorage.setItem("@pokeSalvo",JSON.stringify(meusPokemons))

        toast.success("Excluido!")

    }

    return(
        <div>
            <button className="voltarHome"><Link to='/'><img src="/seta-esquerda.png" alt="" /></Link></button>
            <div className='containerFav'>
            {favorito.map((item)=>{
                let imgPoke = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${item.id}.gif`

                return(
                    <div key={item.id} className='favoritosCont'>
                       
                        <Link to='/Detalhes' state={{ pokemonAtual: item }}>
                        <img src={`${imgPoke}`} alt="pokemons"/>
                        {item.name}
                        </Link>
                        <button className='remove' onClick={()=>excluir(item)}>X</button>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Favoritos;
