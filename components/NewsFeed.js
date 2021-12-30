import React ,{useState,useEffect} from 'react';
import { View ,ScrollView,Text} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'


export default function Feed() {

    const [articles, setArticles] = useState([])

    const getNewsFromApi = () => {
        return fetch('https://tt.vfl-winz-baak.de/articles/all')
          .then((response) => response.json())
          .then((json) => {
            setArticles(json)
          })
          .catch((error) => {
            console.error(error);
          });
      };

    useEffect(() => {
        getNewsFromApi()
    },[])

    const NewsCard = (props) => (
        <Card style={{margin:15}}>
        <Card.Content>
            <Title>{props.article.title}</Title>
        </Card.Content>
        {/* <Card.Cover source={{ uri: 'https://tt.vfl-winz-baak.de/static/media/'+props.article.img }} /> */}
        <Card.Actions>
            <Button>More</Button>
        </Card.Actions>
        </Card>
      );


    return (
        <View>
            <ScrollView>
                {
                    articles.reverse().map((article, i) => { return <NewsCard key={article.id} article={article}></NewsCard>})
                }
            </ScrollView>
      </View>
    );
  }
  