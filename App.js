import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
  Image
} from 'react-native';
import { API_KEY } from '@env'; // Importe a chave da API do arquivo .env

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const App = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = () => {
    if (!search) return;
    setLoading(true);
    setError('');
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
        } else {
          setMovies([]); // Limpa a lista de filmes
          setError('Nenhum filme encontrado com esse nome.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao buscar os filmes.');
        setLoading(false);
      });
  };

  const getMovieDetails = (movieId) => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setSelectedMovie(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar detalhes do filme.');
        setLoading(false);
      });
  };

  if (selectedMovie) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.detailContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedMovie(null)}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: `${IMAGE_BASE_URL}${selectedMovie.poster_path}` }}
            style={styles.detailImage}
            resizeMode="cover"
          />
          <Text style={styles.detailTitle}>{selectedMovie.title}</Text>
          <Text style={styles.detailSubtitle}>Data de lançamento: {selectedMovie.release_date}</Text>
          <Text style={styles.detailSubtitle}>Avaliação: {selectedMovie.vote_average}</Text>
          <Text style={styles.detailOverview}>{selectedMovie.overview}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Digite o nome do filme"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchMovies}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="#3498db" style={styles.loader} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {movies.length === 0 && !loading && !error && (
        <Text style={styles.noResults}>Nenhum filme encontrado.</Text>
      )}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => getMovieDetails(item.id)} style={styles.card}>
            <Image
              source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
              style={styles.movieImage}
              resizeMode="cover"
            />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieRelease}>{item.release_date}</Text>
              <Text style={styles.movieOverview} numberOfLines={2}>{item.overview}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  searchSection: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#3498db',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  noResults: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieImage: {
    width: 80,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  movieRelease: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  movieOverview: {
    fontSize: 14,
    color: '#34495e',
  },
  detailContainer: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
  },
  detailImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  detailSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  detailOverview: {
    fontSize: 16,
    color: '#34495e',
    marginTop: 10,
    lineHeight: 22,
  }
});

export default App;