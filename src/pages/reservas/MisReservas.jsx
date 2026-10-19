// src/pages/reservas/MisReservas.jsx
import React from 'react';

export function MisReservas(reservasLista = []){

    //i want to add a common space here, something both of the elements share. like the title of the page and the search bar
    if (reservasLista.length === 0)
        return SearchBar() + ReservasVacio();

    return SearchBar() + Reservas(reservasLista);

}

export function Header(){
    return(
        <>


        </>);
}

export function SearchBar({mostrarFechas}){
    return (
        <>
        <div className={"search-bar"}>
            <button className={"dropdown-filter"}>
                Estado: Todos
            </button>

            {/*solo mostrar fechas si hay reservas*/}

            { mostrarFechas && (
                <div className={"date-filter"}>
                    <div className={"date-filter-start"}>Desde 14/09/2026</div>
                    <div className={"date-filter-end"}>Hasta 30/09/2026</div>
                </div>
            )

            }

            <input placeholder={"Buscar por código o espacio..."}/>
        </div>

        </>

    );
}

export function ReservasVacio(){
    return(
      <>


      </>
    );
}

export function Reservas(reservasLista = []){
    return(
      <>



      </>
    );
}