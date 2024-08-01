/* eslint-disable */import React from 'react';
import PropTypes from 'prop-types';
import { Contenedor, Boton } from './GrupoBotones.styled';
import { ReactComponent as IconoAutoVerde } from '../../../recursos/iconos/ico_info_vehiculo_green.svg';
import { ReactComponent as IconoAutoBlanco } from '../../../recursos/iconos/ico_info_vehiculo_white.svg';
import { ReactComponent as IconoDanoVerde } from '../../../recursos/iconos/ico_casa_verde.svg';
import { ReactComponent as IconoDanoBlanco } from '../../../recursos/iconos/ico_casa_blanco.svg';

import { ReactComponent as IconoReciboNegro } from '../../../recursos/iconos/ico_recibos_negro.svg';
import { ReactComponent as IconoEndosoNegro } from '../../../recursos/iconos/ico_endosos_negro.svg';
import { ReactComponent as IconoReciboBlanco } from '../../../recursos/iconos/ico_recibos_blanco.svg';
import { ReactComponent as IconoEndosoBlanco } from '../../../recursos/iconos/ico_endosos_blanco.svg';
import { v4 } from 'uuid';

const GrupoBotones = props => {
	const {
		evento,
		tipoSeleccionado,
		opcion1,
		opcion2,
		opcion3,
		texto1,
		texto2,
		texto3,
		tipoIconos,
		noBotones = 2,
	} = props;

	const alSeleccionarTipo = tipo => {
		console.log(tipo);
		evento(tipo);
	};

	const OBTENER_ICONO = {
		lineaNegocio: {
			opcion1: {
				activo: () => (
					<IconoAutoBlanco width={22} className="grupobtn-icono" />
				),
				inactivo: () => (
					<IconoAutoVerde width={22} className="grupobtn-icono" />
				),
			},
			opcion2: {
				activo: () => (
					<IconoDanoBlanco width={22} className="grupobtn-icono" />
				),
				inactivo: () => (
					<IconoDanoVerde width={22} className="grupobtn-icono" />
				),
			},
			opcion3: {
				activo: () => (
					<IconoDanoBlanco width={22} className="grupobtn-icono" />
				),
				inactivo: () => (
					<IconoDanoVerde width={22} className="grupobtn-icono" />
				),
			},
		},
		tipoRecibo: {
			opcion1: {
				activo: () => (
					<IconoReciboBlanco width={22} className="grupobtn-icono" />
				),
				inactivo: () => (
					<IconoReciboNegro width={22} className="grupobtn-icono" />
				),
			},
			opcion2: {
				activo: () => (
					<IconoEndosoBlanco width={22} className="grupobtn-icono" />
				),
				inactivo: () => (
					<IconoEndosoNegro width={22} className="grupobtn-icono" />
				),
			},
			opcion3: {
				activo: () => (
					<IconoEndosoBlanco width={22} className="grupobtn-icono" />
				),
				inactivo: () => (
					<IconoEndosoNegro width={22} className="grupobtn-icono" />
				),
			},
		},
	};

	return (
		<Contenedor>
			<Boton
				key={v4()}
				onClick={() => alSeleccionarTipo(opcion1)}
				active={tipoSeleccionado === opcion1}>
					{texto1}
			</Boton>
			<Boton
				key={v4()}
				onClick={() => alSeleccionarTipo(opcion2)}
				active={tipoSeleccionado === opcion2}>
				{texto2}
			</Boton>

			{noBotones >= 3 && (
				<Boton
					key={v4()}
          			style={{marginTop: '10px'}}
					onClick={() => alSeleccionarTipo(opcion3)}
					active={tipoSeleccionado === opcion3}
        >
					{tipoSeleccionado === opcion3
						? [OBTENER_ICONO[tipoIconos]['opcion3'].activo()]
						: [OBTENER_ICONO[tipoIconos]['opcion3'].inactivo()]
          }
					{texto3}
				</Boton>
			)}
		</Contenedor>
	);
};

GrupoBotones.propTypes = {
	evento: PropTypes.func,
	tipoSeleccionado: PropTypes.string,
	opcion1: PropTypes.string,
	opcion2: PropTypes.string,
	opcion3: PropTypes.string,
	texto1: PropTypes.string,
	texto2: PropTypes.string,
	texto3: PropTypes.string,
	tipoIconos: PropTypes.string,
};

GrupoBotones.defaultProps = {
	evento() {},
	tipoSeleccionado: 'AUTR',
	opcion1: 'AUTR',
	opcion2: 'DAN',
	opcion3: 'GMM',
	texto1: 'HDI auto',
	texto2: 'HDI daños',
	texto3: 'HDI GMM',
	tipoIconos: 'lineaNegocio',
};

export default GrupoBotones;
