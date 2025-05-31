import { Clock, Heart, ShoppingCart } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Ingredient {
  name: string;
  quantity: string;
}

interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  cookTime: string;
  ingredients: Ingredient[];
  isFavorite?: boolean;
}

interface RecipeCardProps {
  recipe: Recipe;
  onPress?: () => void;
  onAddToShoppingList?: () => void;
  onToggleFavorite?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onPress,
  onAddToShoppingList,
  onToggleFavorite,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: recipe.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {recipe.title}
          </Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onToggleFavorite}
          >
            <Heart
              size={20}
              color={recipe.isFavorite ? "#FF3B30" : "#8E8E93"}
              fill={recipe.isFavorite ? "#FF3B30" : "none"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.timeContainer}>
          <Clock size={16} color="#8E8E93" />
          <Text style={styles.timeText}>{recipe.cookTime}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>

        <View style={styles.ingredientsList}>
          {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>
              • {ingredient.name}
              {ingredient.quantity ? ` (${ingredient.quantity})` : ""}
            </Text>
          ))}
          {recipe.ingredients.length > 3 && (
            <Text style={styles.moreIngredients}>
              +{recipe.ingredients.length - 3} more
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddToShoppingList}
          activeOpacity={0.8}
        >
          <ShoppingCart size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add to Shopping List</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333333",
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  timeText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666666",
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F7",
    marginVertical: 12,
  },
  ingredientsTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#333333",
    marginBottom: 8,
  },
  ingredientsList: {
    marginBottom: 16,
  },
  ingredient: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  moreIngredients: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#FF9500",
    marginTop: 4,
  },
  addButton: {
    backgroundColor: "#4CD964",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  addButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
