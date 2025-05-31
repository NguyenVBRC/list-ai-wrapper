import { RecipeCard } from "@/components/RecipeCard";
import { getSavedRecipes } from "@/utils/storage";
import { BookOpen } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const loadSavedRecipes = async () => {
    try {
      setLoading(true);
      const savedRecipes = await getSavedRecipes();
      setRecipes(savedRecipes);
    } catch (error) {
      console.error("Failed to load saved recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF9500" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <BookOpen size={64} color="#CCCCCC" />
          <Text style={styles.emptyTitle}>No saved recipes yet</Text>
          <Text style={styles.emptyText}>
            Your saved recipes will appear here. Search for recipes and save
            them to your collection.
          </Text>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              /* Navigate to search tab */
            }}
          >
            <Text style={styles.searchButtonText}>Find Recipes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Recipes</Text>
            <Text style={styles.recipeCount}>{recipes.length} saved</Text>
          </View>

          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#333333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  searchButton: {
    backgroundColor: "#FF9500",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  searchButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#333333",
  },
  recipeCount: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#666666",
  },
});
