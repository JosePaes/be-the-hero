import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './style.css';
import logoImg from '../../assets/logo.svg';

function NewIncident(){

    const [title, setTitle] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            descricao,
            valor
        }

        try {

            await api.post('incidents', data, {
                headers: {
                    authorization: ongId,
                }
            })

            history.push('/profile');
            
        } catch (err) {

            alert('Erro ao Criar CAso');
            
        }

    }

    return (

        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva o caso detalhadamente
                        para encontrar um herói para resolver isso.
                    </p>

                    <Link  className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                         Voltar para a Home
                    </Link>

                </section>
                <form onSubmit={handleNewIncident}>

                    <input 
                        placeholder="Titulo do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}

                    />
                    
                    <input 
                        placeholder="Valor em Reais R$"
                        value={valor}
                        onChange={e => setValor(e.target.value)}

                    />
                        
                    <button className="button" type="submit">Cadastrar</button>
                    
                </form>
            </div>
        </div>

    );

}

export default NewIncident;