import { useEffect, useState } from 'react';
import { Filtros } from './components/Filtros';
import Header from './components/Header';
import { ListadoGastos } from './components/ListadoGastos';
import { Modal } from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('Presupuesto')) ?? 0
  );
  const [gastos, setGastos] = useState(
    //Si hay algo en localStorage, traelo y conviertelo en arreglo, y si no hay, pon un arreglo vacio
    localStorage.getItem('Gastos') ? JSON.parse(localStorage.getItem('Gastos')) : []
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const [animarModal, setAnimarModal] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 400);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('Presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('Gastos', JSON.stringify(gastos) ?? [])
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFilt = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFilt);
    }
  }, [filtro]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('Presupuesto') ?? 0);
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 400);
  }

  const guardarGasto = gasto => {

    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 400);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        gastos={gastos} />

      {isValidPresupuesto && (

        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              setGastoEditar={setGastoEditar}
              gastos={gastos}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="Icono-Nuevo-Gasto"
              onClick={handleNuevoGasto} />
          </div>
        </>
      )}
      {
        modal && <Modal setGastoEditar={setGastoEditar} gastoEditar={gastoEditar} guardarGasto={guardarGasto} setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} />
      }
    </div>
  )
}

export default App
