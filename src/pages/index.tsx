import { useState, ChangeEvent } from "react";
import Models from "./../datas/vehicle.json";
import styles from './style.module.scss';

export default function Home() {
  interface Dictionary<T> {
    [key: string]: T;
  }
  const cars: Dictionary<Object> = Models;

  const [showUpload, setShopUpload] = useState(false);

  interface ISelectVehicle {
    model: any;
    selectedMake?: String;
    badge?: String[];
    selectedVehicle?: Object;
    selectedModel?: String;
    selectedBadge?: String;
  };

  const [selectedVehicle, setSelectedVehicle] = useState<ISelectVehicle>({
    model: [],
  });

  const handleSetmake = (e: ChangeEvent<HTMLInputElement>) => {
    const vehicle = e.target.value;
    vehicle != 'make' && setSelectedVehicle({
      model: cars[vehicle],
      selectedMake: vehicle,
      selectedVehicle: cars[vehicle],
    });
  };

  const handleSetModel = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedModel = e.target.value;
    
    selectedModel != 'model' && setSelectedVehicle({
      ...selectedVehicle,
      badge: selectedVehicle.model[selectedModel],
      selectedModel
    });
    setShopUpload(false);
  };

  const handleSetBadge = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedBadge = e.target.value;
    
    selectedBadge != 'badge' && setSelectedVehicle({
      ...selectedVehicle,
      selectedBadge
    });
    setShopUpload(true);
  };

  return (
    <div className={styles.cars}>
      <h1>Drill Down Form</h1>
      <form action="http://localhost:5000/upload">
        <select onChange={(event: any) => handleSetmake(event)}>
          <option>make</option>
          {Object.keys(cars).map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        {Object.keys(selectedVehicle.model).length > 0 && (
          <select onChange={(event: any) => handleSetModel(event)}>
            <option>model</option>
            {Object.keys(selectedVehicle.model).map((md: any) => (
              <option key={md} value={md}>
                {md}
              </option>
            ))}
          </select>
        )}
        {selectedVehicle.badge && (
          <select onChange={(event: any) => handleSetBadge(event)}>
            <option>badge</option>
            {selectedVehicle.badge.map((bd: any) => (
              <option key={bd} value={bd}>
                {bd}
              </option>
            ))}
          </select>
        )}
        {showUpload && <div className={styles.upload}>
          Upload Logbook
          <input type="file" name="logbook" id="logbook" />
          <button type="submit">Submit</button>
        </div>}
      </form>
      <h2>Select a Vehicle</h2>
    </div>
  );
}
