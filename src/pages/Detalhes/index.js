import { useState,useEffect } from "react";
import { Link,useLocation} from "react-router-dom";
import api from "../../services/api";
import "./detalhes.css"


const Detalhes = () =>{
    
    const location = useLocation();
    const [tipoPoke,setTipoPoke] = useState("");
    const pokemon = location.state?.pokemonAtual;

    const[poke,setPoke] = useState(pokemon.name);
    const [pokemonObj,setPokemonObj] = useState([]);

    useEffect(()=>{
        
async function carregarPokemon() {
        try {

                const response = await api.get(`/pokemon/${poke}/`)
               
                setPokemonObj([response.data])

                
            } catch (error) {
                console.log("Erro ao carregar lista de pokémons")
                console.log(error)
            }
        }
         
        carregarPokemon()
        
     

    },[])


    return(
        <div className="detalhesConteiner">
           
            {console.log(pokemonObj)}
            {pokemonObj.map((item)=>{
                 
                const pokeId = item.id
                const spritUrl = 
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`
                return(

                    <div key={pokeId} className={ `pokemonDetalhes ${item.types[0].type.name}`}  >
                        <button className="voltarHome"><Link to='/'>{"Voltar"}</Link></button>
            <div className="nameIdDetalhes">

            <strong className="pokeId">{"#"+pokeId}</strong>    
            <strong className="pokeNome">{item.name}</strong>
           
            {console.log(item.types[0].type.name)}

            <div className="tipos">
            {item.types.map((tipo,i)=>{
               
                
                return(
                    <strong className="tipoPoke" key={i}>{tipo.type.name}</strong>
                   
                )
            })}
            </div>
            </div> 
             <div className="imgPokeDetalhes">
                <img src={spritUrl} alt={item.name} />
             
             </div> 
              
            </div> 
                )
            })}
           
            
        </div>
        
    )
}

export default Detalhes;