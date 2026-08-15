import { useState,useEffect } from "react";
import { Link,useLocation} from "react-router-dom";
import api from "../../services/api";
import "./detalhes.css"


const Detalhes = () =>{
    
    const location = useLocation();
    const [tipoPoke,setTipoPoke] = useState("");
    const pokemon = location.state?.pokemonAtual;
    const [total,setTotal]=useState([])
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
                        <button className="voltarHome"><Link to='/'><img src="/seta-esquerda.png" alt="" /></Link></button>
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

           {pokemonObj.map((itemStatus)=>{

            return(
           <div className="statusPoke">
            <h4 className={`statusTitulo ${itemStatus.types[0].type.name}`}>Base Status</h4>

            <div className="statusName">
            {console.log(itemStatus.stats[0].stat)}
            {console.log(itemStatus.stats[0].base_stat)}    
            {itemStatus.stats.map((statu,i)=>{

                

                
                

               

                return(
                
                  <div key={i} className="statuName">
                    <div className="conteudoStatus">
                        <strong>{statu.stat.name} </strong> 
                    <p className="statuNumber">{statu.base_stat}</p>
                    <progress className={`${statu.stat.name}`} value={statu.base_stat} max={100}></progress>
                    
                    </div>
                    
                  </div>
                
                )

                
            })}   
                
                </div>
                {/* <div className="statuName">
                <div className="conteudoStatus">

                <strong className="totalName">Total</strong>
                <p className="statuNumber totalValor">10</p>
                </div>
                </div> */}
           </div>)
        })}
        </div>
        
    )
}

export default Detalhes;