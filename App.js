import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image, StyleSheet } from 'react-native';

let originalData = []; // Store the original data for filtering

const App = () => {
    const [mydata, setMydata] = useState([]);  // Holds the data to be displayed
    const [searchText, setSearchText] = useState('');  // For text input filtering

    // Fetch the data when the component mounts
    useEffect(() => {
        const myurl = "https://c346-l16.onrender.com/allpopmarts";  // Your correct Popmart API URL
        fetch(myurl)
            .then((response) => response.json())
            .then((myJson) => {
                setMydata(myJson);
                originalData = myJson;  // Save original data for filtering
            })
            .catch(error => console.error('Error fetching data:', error)); // Error handling
    }, []);

    // Filter data by artist name or Popmart name
    const filterBySearchText = (text) => {
        setSearchText(text);
        if (text !== '') {
            let filtered = originalData.filter((item) =>
                item.popmart_name.toLowerCase().includes(text.toLowerCase()) ||  // Case-insensitive search for Popmart name
                item.artist_name.toLowerCase().includes(text.toLowerCase())   // Case-insensitive search for Artist name
            );
            setMydata(filtered);
        } else {
            setMydata(originalData);  // Reset to original data when search is empty
        }
    };

    // Render each Popmart item
    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.popmart_pic }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.popmart_name}</Text>
                    <Text style={styles.artist}>{item.artist_name}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            {/* Search by Text */}
            <Text>Search by Popmart Name or Artist:</Text>
            <TextInput
                style={styles.searchInput}
                value={searchText}
                onChangeText={filterBySearchText}
                placeholder="Search Popmart or Artist..."
            />

            {/* List of Popmarts */}
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text>No items to display</Text>}  // Show a message when no data is available
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    searchInput: {
        borderWidth: 1,
        padding: 8,
        marginBottom: 15,
        borderRadius: 5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    artist: {
        fontSize: 14,
        color: 'gray',
    },
});

export default App;
