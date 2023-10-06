import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { SearchResult, SearchType, useApi } from '../hooks/useApi';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {

const { searchData } = useApi()

const [searchTerm, setSearchTerm] = useState('');
const [type, setType] = useState<SearchType>(SearchType.all);
const [results, setResults] = useState<SearchResult[]>([]);

useEffect(() => {
  if (searchTerm === '') {
    setResults([])
    return
  }

  const loadData = async() => {
    const result: any = await searchData(searchTerm, type)
    console.log("🚀 ~ file: Home.tsx:31 ~ loadData ~ result", result)
    
    if (result?.Error) {
      //setResults(result)
    } else {
      setResults(result.Search)
    }
  }
  loadData()
}, [searchTerm]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar value={searchTerm}
        debounce={300}
        onIonChange={(e) => setSearchTerm(e.detail.value!)}>
        </IonSearchbar>

        <IonItem>
          <IonLabel>Select SearchType</IonLabel>
          <IonSelect value={type}
          onIonChange={(e) => setType(e.detail.value!)}>
          <IonSelectOption value="">All</IonSelectOption>
          <IonSelectOption value="movie">Movie</IonSelectOption>
          <IonSelectOption value="series">Series</IonSelectOption>
          <IonSelectOption value="episode">Episode</IonSelectOption>
          
          </IonSelect>
        </IonItem>
        <IonList>
          {results.map((item: SearchResult) => (
            <IonItem>
              <IonLabel>{item.Title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
