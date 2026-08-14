import { useEffect, useState } from "react";
// importando o axios com a url base
import api from "../../services/api";
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [pokemo, setPokemon] = useState([]);
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([]);
    const [proximo, setProximo] = useState(JSON.parse(localStorage.getItem("@pok")) || 6);
    



    useEffect(() => {
        localStorage.setItem("@pok", JSON.stringify(proximo))
    }, [proximo])
    

    const prox = () => {
        setProximo(proximo + 6)


    };

    console.log(proximo);

    const ants = () => {
        if (proximo > 6) {
            setProximo(proximo - 6)
        }
    };

    console.log(proximo)

    const buscar = (e) => {
        e.preventDefault();
        setInput(input)
        apagar()
        pokemons()
       

    };

    console.log(input)

    async function pokemons() {

        try {
            const pokemon = await api.get(`/pokemon/${input.toLowerCase()}/`)
            setPokemon([pokemon.data])
            console.log("carregou o pokemon")

        } catch (error) {
            console.log(error)
        }

    }


    async function carregarTodos() {
        try {

            const response = await api.get(`/pokemon?offset=0&limit=${proximo}`)

            setTodos(response.data.results)




        } catch (error) {
            console.log("Erro ao carregar lista de pokémons")
            console.log(error)
        }
    };
    useEffect(() => {




        carregarTodos();

    }, [proximo]);


    const apagar = () => {
        setTodos([])
    }

    const limparBusca = () => {
        setInput("")
        setPokemon([])
        carregarTodos()

    }








    return (
        <div>
            <div className={todos.length > 1 ? "container":""}>
                <div className="banner">
                <img src="pokebola.png" alt="pokebola" width="50px" height="50px"/>
                <h1 className="titulo">Pokédex</h1>
                    <img src="pikachu.png" alt="celular pokemon" width="50px" height="50px"/>
                </div>

                <form onSubmit={buscar}>
                    <div className="lupaContainer">
                    <input className="campo" type="search" value={input} onChange={(e) => setInput(e.target.value)} required  placeholder="Nome ou Número"/>
                    <button type="submit" >🔎</button>
                    </div>
                </form>


                <div className="pokeContainer">

                    

                        {pokemo.map((itempoke) => {
                            const pokeId = itempoke.id
                            const spritUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokeId}.gif`
                            return (
                                <div key={itempoke.id} className="pokemonsBusca">
                                    <Link to='/Detalhes' state={{ pokemonAtual: itempoke }} className="pokeBusca"><img src={spritUrl} alt={itempoke.name} className="imgPoke" />

                                    <strong className="idpoke">{"#"+pokeId}</strong>
                                    <strong className="namepoke">{itempoke.name}</strong>
                                    </Link>
                                    <button className="btnvoltar" onClick={limparBusca}>Voltar</button>
                                </div>
                            )
                        })}
                    

                    {todos.map((item2) => {

                        const pokeId = item2.url.split("/")[6];
                        const spritUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokeId}.gif`;

                        return (
                            <div key={pokeId} className="pokemons">
                                <Link to='/Detalhes' state={{ pokemonAtual: item2 }} className="pokeBtn">
                                
                                    <img src={spritUrl} alt={item2.name} className="imgPoke" />

                                    <strong className="idpoke">{"#" + pokeId}</strong>
                                    <strong className="namepoke">{item2.name}</strong>
                                
                                </Link>
                                
                                
                                
                            </div>
                        )

                    })}

                </div>
                {
                  todos.length > 1 ?  <button className="btnCarregar" onClick={ants}>anterior</button>: null}

                {todos.length >1 ?<button className="btnCarregar" onClick={prox}>Proximo</button>:null}
                
            </div>

        </div>
    )
};

export default Home;