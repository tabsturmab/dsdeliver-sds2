import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import AsyncSelect from 'react-select/async'; //Ao digitar, utiliza o autocompletar.
import { fetchLocalMapBox } from '../api';
import { OrderLocationData } from './types';

// Posição Inicial (Rua Cubatão, Vila Mariana).
const initialPosition = {
  lat: -23.5807864,
  lng: -46.6417236
}

//Definição do local selecionado pelo usuário.
type Place = {
  label?: string;
  value?: string;
  position: {
    lat: number;
    lng: number;
  };
}

//prepara o endereço para ser enviado para a api.
type Props = {
  onChangeLocation: (location: OrderLocationData) => void;
}

//O endereço selecionado.
function OrderLocation({ onChangeLocation }: Props) {
  const [address, setAddress] = useState<Place>({
    position: initialPosition
  });

  // Busca o endereço com autocompletar utilizando a api do mapbox.
  
  const loadOptions = async (inputValue: string, callback: any) => {
  // const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
    const response = await fetchLocalMapBox(inputValue);

    const places = response.data.features.map((item: any) => {
      return ({
        label: item.place_name,
        value: item.place_name,
        position: {
          lat: item.center[1],
          lng: item.center[0]
        }
      });
    });
    //Através do callback que ele consegue carregar as opções no select.
    return callback(places);
  };

  const handleChangeSelect = (place: Place) => {
    setAddress(place);
    onChangeLocation({
      latitude: place.position.lat,
      longitude: place.position.lng,
      address: place.label!
    });
  };

  return (
    <div className="order-location-container">
      <div className="order-location-content">
        <h3 className="order-location-title">Selecione onde o pedido deve ser entregue</h3>

        {/* Bloco para buscar do endereço */}
        <div className="filter-container">

          <AsyncSelect
            placeholder="Digite um endereço para entrega"
            className="filter"
            loadOptions={loadOptions}         
            //Para quando mudar o valor no Mapa e envia como Place (casting).
            onChange={value => handleChangeSelect(value as Place)} />
        </div>

        {/* Posição do Mapa e Zoom */}
        <MapContainer
          center={address.position}
          zoom={17}
          key={address.position.lat}
          scrollWheelZoom>

          {/* Imagens do Mapa */}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Marcador do Mapa */}
          <Marker position={address.position}>
            <Popup>
              {address.label}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default OrderLocation;
