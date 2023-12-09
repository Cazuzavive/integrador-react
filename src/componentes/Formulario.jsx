import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import FormularioStyle from "../css/Formulario.module.css"


const Formulario = () => {
    const [historial, setHistorial] = useState(() => {
        let storage = localStorage.getItem("historial");
        if (storage) return JSON.parse(storage);
        localStorage.setItem("historial", JSON.stringify([]));
        return [];
    });
    const [load, setLoad] = useState(false);
    const [listOne, setListOne] = useState([]);
    const [listTwo, setListTwo] = useState([]);
    const [optionOne, setOptionOne] = useState(null);
    const [optionTwo, setOptionTwo] = useState(null);
    const [value, setValue] = useState(null);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        setLoad(true);
        fetch("/data.json")
            .then((res) => res.json())
            .then((datos) => {
                setListOne(datos.filter(({ type }) => type == "origen"));
                setListTwo(datos.filter(({ type }) => type == "destino"));
            })
            .catch((error) => console.error(error))
            .finally(() =>
                setLoad(false));
    }, []);

    useEffect(() => localStorage.setItem("historial", JSON.stringify(historial)),
        [historial]
    );

    const cotizar = (e) => {
        e.preventDefault();
        if (value <= 0 || optionOne == null || optionTwo == null) {
            return Swal.fire("", "Debe completar todos los campos", "error");
        }
        setLoad(true)
        setTimeout(() => {
            let origen = listOne.find(({ id }) => id == optionOne);
            let destino = listTwo.find(({ id }) => id == optionTwo);
            setTotal(1000 * parseFloat(value) * origen.increment * destino.increment);
            setLoad(false);
            e.target.reset();
        }, 4000);
    }

    const guardar = () => {
        setHistorial([
            ...historial,
            {
                fecha: new Date().toDateString("es-mx"),
                time: new Date().toLocaleTimeString("es-mx"),
                origen: listOne.find(({ id }) => id == optionOne),
                destino: listTwo.find(({ id }) => id == optionTwo),
                total: total.toFixed(7),
            },
        ]);

        setTotal(null);
        return Swal.fire("", "Historial actualizado", "success");

    };

    return (<>
        {
            load && (
                <>
                    <p>Cargando sus datos</p>
                </>
            )
        }
        {
            !load &&
            <form onSubmit={cotizar} className={FormularioStyle.form}>
                <fieldset>
                    <label htmlFor="origen">Pais de origen</label>
                    <select className={FormularioStyle.select}
                        name="origen"
                        id="origen"
                        defaultValue={0}
                        onChange={({ target }) => { setListTwo(listTwo.filter(option => option.id != target.value)); setOptionOne(target.value) }}
                    >

                        <option value={0} disabled>
                            Seleccionar su pais de origen
                        </option>
                        {listOne.map(({ id, content }) => (
                            <option key={id} value={id}>
                                {content}
                            </option>
                        ))}
                    </select>
                </fieldset>
                <fieldset className={FormularioStyle.fieldset}>
                    <label htmlFor="destino" >Pais de destino</label>
                    <select className={FormularioStyle.select}
                        name="destino"
                        id="destino"
                        defaultValue={0}
                        onChange={({ target }) => { setListOne(listOne.filter(option => option.id != target.value)); setOptionTwo(target.value) }}>

                        <option value={0} disabled>
                            Seleccionar su pais de destino
                        </option>
                        {listTwo.map(({ id, content }) => (
                            <option key={id} value={id}>
                                {content}
                            </option>
                        ))}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="dias">Estadia de viaje</label>
                    <input className={FormularioStyle.input}
                        type="number"
                        name="dias"
                        id="dias"
                        min={7}
                        max={183}
                        onInput={({ target }) => setValue(target.value)}
                    />
                </fieldset>
                <button type="submit">Cotizar</button>
            </form >
        }
        {
            total && (
                <form onSubmit={(e) => e.preventDefault()}>
                    <h2> El total de su seguro es ${total.toFixed(2)}</h2>
                    <button type="button" onClick={guardar}>Guardar</button>
                </form>

            )
        }
    </>)
};

export default Formulario;

/*


*/