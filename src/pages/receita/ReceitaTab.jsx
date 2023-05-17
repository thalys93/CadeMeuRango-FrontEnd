import React , {useEffect} from 'react'
import ReceitaCard from './ReceitaCard'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'
import { getRecipes } from '../../utils/api/services/api';
import { ProgressBar } from 'react-bootstrap';

import '../home/home.css'

function ReceitaTab() {

  const [cardReceitas, setCardReceitas] = React.useState([]);

  const [carregou , setCarregou] = React.useState(false);
  const [falha, setfalha] = React.useState(false);
  const [contador, setContador] = React.useState(0);

  useEffect(() => {  
      const fetchData = async () => {
        try {
          const data = await getRecipes();
          setCardReceitas(data);
          setCarregou(true);
        } catch (error) {
          console.log('Falha Ao Obter Dados Da API' , error);
          setfalha(true);     
        }
      };
      fetchData();
  }, []);


  useEffect(() => {
    if (carregou) {
      const timer = setInterval(() => {
        setContador((contador) => contador + 1);
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [carregou]);


  // Contexto do Modo Escuro
  const { isDarkMode } = React.useContext(DarkModeContext)

  const [progressBar, setProgressBar] = React.useState(100);


  
  if(!carregou) {
    return (
<section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Veja as receitas que preparamos para você hoje! </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
            <ol className='list-group container break-line-list'>
              <li className="animate__animated animate__fadeIn">
                <h2 className={isDarkMode? 'list-group-item bg-warning text-center border-0 txt' : 'list-group-item bg-warning text-center border-0 txt'}> Carregando API </h2>
                <ProgressBar animated  now={progressBar} variant='warning'/>
              </li>              
            </ol>
        </div>
    </section>
    )
  }

  if (falha) {
    return (
<section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Veja as receitas que preparamos para você hoje! </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
            <ol className='list-group container break-line-list'>
              <li className="animate__animated animate__fadeIn">
                <h2 className={isDarkMode? 'list-group-item bg-danger text-center border-0 DarkTxt' : 'list-group-item bg-danger text-center border-0 DarkTxt'}> Falha na API (500) </h2>
                <ProgressBar animated  now={progressBar} variant='danger'/>
              </li>              
            </ol>
        </div>
    </section>
    )
  }


  return (
    <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Veja as receitas que preparamos para você hoje! </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
            <ol className='list-group list-group-horizontal gap-4 container break-line-list'>
              {cardReceitas.map((card, index) => (    
                contador > index ? (            
                <li key={index} className="animate__animated animate__fadeIn">
                  <ReceitaCard 
                  key={card}
                  title={card.titulo}
                  imgLink={card.imagem}/>
                </li>) : null
              ))}     
            </ol>
        </div>
    </section>
  )
}

export default ReceitaTab