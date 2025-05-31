import { RecipeCard } from "@/components/RecipeCard";
import { searchRecipes } from "@/utils/recipeApi";
import { StatusBar } from "expo-status-bar";
import { Search, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const results = await searchRecipes(query);
      setRecipes(results);
    } catch (err) {
      setError("Failed to find recipes. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setRecipes([]);
    setError("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Search size={20} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Search for a recipe..."
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              placeholderTextColor="#8E8E93"
            />
            {query.length > 0 && (
              <TouchableOpacity
                onPress={clearSearch}
                style={styles.clearButton}
              >
                <X size={18} color="#8E8E93" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            activeOpacity={0.8}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF9500" />
            <Text style={styles.loadingText}>Finding recipes...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : recipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Find your next meal</Text>
            <Text style={styles.emptyText}>
              Search for any dish like "cheeseburger" or "pasta" to see recipes
              and ingredients
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.resultsContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.resultsTitle}>Results</Text>
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </ScrollView>
        )}
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  keyboardAvoid: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#000000",
  },
  clearButton: {
    padding: 6,
  },
  searchButton: {
    backgroundColor: "#FF9500",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF9500",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#333333",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#333333",
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#333333",
    marginBottom: 16,
    marginTop: 8,
  },
});
