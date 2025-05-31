import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import {
  ChevronLeft,
  Clock,
  Heart,
  Share2,
  ShoppingCart,
  Users,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Instruction {
  step: number;
  text: string;
}

interface RecipeDetailProps {
  recipe: {
    id: string;
    title: string;
    imageUrl: string;
    cookTime: string;
    servings: number;
    ingredients: Ingredient[];
    instructions: Instruction[];
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    isFavorite: boolean;
  };
  onToggleFavorite: () => void;
  onAddToShoppingList: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onToggleFavorite,
  onAddToShoppingList,
}) => {
  const navigation = useNavigation();
  const [servings, setServings] = useState(recipe.servings);

  const increaseServings = () => {
    setServings((prev) => prev + 1);
  };

  const decreaseServings = () => {
    if (servings > 1) {
      setServings((prev) => prev - 1);
    }
  };

  const getAdjustedQuantity = (quantity: string, originalServings: number) => {
    // Extract numeric value and unit
    const match = quantity.match(/^([\d.]+)(.*)$/);
    if (!match) return quantity;

    const value = parseFloat(match[1]);
    const unit = match[2];
    const ratio = servings / originalServings;
    const adjustedValue = (value * ratio).toFixed(1).replace(/\.0$/, "");

    return `${adjustedValue}${unit}`;
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: recipe.title,
        message: `Check out this recipe for ${recipe.title}!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          <BlurView intensity={80} style={styles.headerBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleShare}
              >
                <Share2 size={22} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButton}
                onPress={onToggleFavorite}
              >
                <Heart
                  size={22}
                  color="#FFFFFF"
                  fill={recipe.isFavorite ? "#FFFFFF" : "none"}
                />
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{recipe.title}</Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={18} color="#FF9500" />
              <Text style={styles.metaText}>{recipe.cookTime}</Text>
            </View>

            <View style={styles.metaDivider} />

            <View style={styles.metaItem}>
              <Users size={18} color="#FF9500" />
              <Text style={styles.metaText}>{servings} servings</Text>
            </View>
          </View>

          <View style={styles.servingContainer}>
            <Text style={styles.servingLabel}>Servings</Text>
            <View style={styles.servingControls}>
              <TouchableOpacity
                style={styles.servingButton}
                onPress={decreaseServings}
                disabled={servings <= 1}
              >
                <Text
                  style={[
                    styles.servingButtonText,
                    servings <= 1 && styles.servingButtonDisabled,
                  ]}
                >
                  −
                </Text>
              </TouchableOpacity>

              <Text style={styles.servingCount}>{servings}</Text>

              <TouchableOpacity
                style={styles.servingButton}
                onPress={increaseServings}
              >
                <Text style={styles.servingButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.nutritionContainer}>
            <Text style={styles.sectionTitle}>Nutrition Info</Text>
            <View style={styles.nutritionValues}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.calories}</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>

              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.protein}g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>

              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>

              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.fat}g</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientQuantity}>
                  {getAdjustedQuantity(ingredient.quantity, recipe.servings)}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Instructions</Text>
          <View style={styles.instructionsContainer}>
            {recipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{instruction.step}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={onAddToShoppingList}
          activeOpacity={0.8}
        >
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.addToCartButtonText}>Add to Shopping List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  headerBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  headerActions: {
    flexDirection: "row",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#333333",
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#666666",
    marginLeft: 6,
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 12,
  },
  servingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  servingLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#333333",
  },
  servingControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  servingButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  servingButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: "#333333",
  },
  servingButtonDisabled: {
    color: "#CCCCCC",
  },
  servingCount: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: "#333333",
    marginHorizontal: 16,
    width: 24,
    textAlign: "center",
  },
  nutritionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#333333",
    marginBottom: 16,
  },
  nutritionValues: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#FF9500",
    marginBottom: 4,
  },
  nutritionLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666666",
  },
  ingredientsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  ingredientName: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },
  ingredientQuantity: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#666666",
    marginLeft: 8,
  },
  instructionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF9500",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepNumber: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  instructionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#333333",
    flex: 1,
    lineHeight: 24,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F2F2F7",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  addToCartButton: {
    backgroundColor: "#4CD964",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  addToCartButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
