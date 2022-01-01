import React, {useState,useEffect} from 'react';
import { Text,View} from 'react-native';
import ScoreBoard from './ScoreBoard';

export default function LiveScoring(props) {

    const [livescores,setLivescores] = useState([])

    const fetchScores = () => {
        fetch("https://tt.vfl-winz-baak.de/livescore/all")
            .then((response) => response.json()
                    .then((json) => {
                        setLivescores(json)
                    })
            )
    }

    useEffect(() => {
        setTimeout(()=>fetchScores(),10000)
    }, [livescores])

    return (
    <>
        <View>
            {
                livescores.map((element,id)=>{
                   return  <ScoreBoard key={id} livescore={element}></ScoreBoard>
                })
            }
        </View>
    </>
    )
}



