import { clearShoppingList, getShoppingList } from "@/utils/storage";
import {
  CircleCheck as CheckCircle2,
  Circle,
  ShoppingBag,
  Trash2,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShoppingListScreen() {
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShoppingList();
  }, []);

  const loadShoppingList = async () => {
    try {
      setLoading(true);
      const list = await getShoppingList();
      setShoppingList(list);
    } catch (error) {
      console.error("Failed to load shopping list:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItemStatus = async (index: number) => {
    const updatedList = [...shoppingList];
    updatedList[index].checked = !updatedList[index].checked;
    setShoppingList(updatedList);
    // Save updated list to storage
  };

  const handleClearList = () => {
    Alert.alert(
      "Clear Shopping List",
      "Are you sure you want to clear your shopping list?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: async () => {
            await clearShoppingList();
            setShoppingList([]);
          },
          style: "destructive",
        },
      ]
    );
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
      {shoppingList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color="#CCCCCC" />
          <Text style={styles.emptyTitle}>Your shopping list is empty</Text>
          <Text style={styles.emptyText}>
            Add ingredients from recipes to create your shopping list.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Shopping List</Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearList}
            >
              <Trash2 size={18} color="#FF3B30" />
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.listContainer}>
              {shoppingList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.listItem}
                  onPress={() => toggleItemStatus(index)}
                  activeOpacity={0.7}
                >
                  {item.checked ? (
                    <CheckCircle2
                      size={24}
                      color="#4CD964"
                      style={styles.checkIcon}
                    />
                  ) : (
                    <Circle
                      size={24}
                      color="#CCCCCC"
                      style={styles.checkIcon}
                    />
                  )}
                  <View style={styles.itemContent}>
                    <Text
                      style={[
                        styles.itemName,
                        item.checked && styles.itemNameChecked,
                      ]}
                    >
                      {item.name}
                    </Text>
                    {item.quantity && (
                      <Text
                        style={[
                          styles.itemQuantity,
                          item.checked && styles.itemQuantityChecked,
                        ]}
                      >
                        {item.quantity}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
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
    lineHeight: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#333333",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  clearButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#FF3B30",
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkIcon: {
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#333333",
  },
  itemNameChecked: {
    textDecorationLine: "line-through",
    color: "#8E8E93",
  },
  itemQuantity: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666666",
  },
  itemQuantityChecked: {
    textDecorationLine: "line-through",
    color: "#8E8E93",
  },
});
