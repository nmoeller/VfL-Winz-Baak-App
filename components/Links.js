import React ,{useState,useEffect} from 'react';
import { View ,ScrollView,Text,Linking} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'


export default function Feed() {

    const [links, setLinks] = useState([])

    const getNewsFromApi = () => {
        return fetch('https://tt.vfl-winz-baak.de/links/all')
          .then((response) => response.json())
          .then((json) => {
            setLinks(json)
          })
          .catch((error) => {
            console.error(error);
          });
      };

    useEffect(() => {
        getNewsFromApi()
    },[])

    const LinksCard = (props) => (
        <Card style={{margin:15}} onPress={() => Linking.openURL(props.link.link)}>
        <Card.Content>
            <Title>{props.link.text}</Title>
        </Card.Content>
        {/* <Card.Cover source={{ uri: 'https://tt.vfl-winz-baak.de/static/media/'+props.link.img }} /> */}
        <Card.Actions>
            <Button>Open</Button>
        </Card.Actions>
        </Card>
      );


    return (
        <View>
            <ScrollView>
                {
                    links.sort((a,b)=>a.text>b.text).map((link, i) => { return <LinksCard key={link.id} link={link}></LinksCard>})
                }
            </ScrollView>
      </View>
    );
  }
  