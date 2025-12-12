import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Star, MapPin, Menu, X } from 'lucide-react-native';
import { courts } from '../data/courts';
import { Colors } from '../constants/colors';
import { Court } from '../types';

const ITEMS_PER_PAGE = 10;

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [pressedCard, setPressedCard] = useState<string | null>(null);
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const filteredCourts = useMemo(() => {
    if (!searchQuery.trim()) return courts;
    
    const query = searchQuery.toLowerCase();
    return courts.filter(
      (court) =>
        court.name.toLowerCase().includes(query) ||
        court.address.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Reset displayed count when search changes
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE);
  }, [searchQuery]);

  // Get the courts to display (initially 10, increases as user scrolls)
  const displayedCourts = useMemo(() => {
    return filteredCourts.slice(0, displayedCount);
  }, [filteredCourts, displayedCount]);

  const hasMore = displayedCount < filteredCourts.length;

  const loadMoreCourts = () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate a small delay for better UX (like a real API call)
    setTimeout(() => {
      setDisplayedCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredCourts.length));
      setIsLoading(false);
    }, 300);
  };

  const handleCardPress = (court: Court) => {
    router.push(`/${court.id}`);
  };

  const renderStarRating = (rating: number) => {
    return (
      <View style={styles.starContainer}>
        <Star size={14} fill={Colors.star} color={Colors.star} />
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  const CourtCard = ({ court }: { court: Court }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      setPressedCard(court.id);
      Animated.spring(scaleValue, {
        toValue: 0.97,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      setPressedCard(null);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => handleCardPress(court)}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <Image 
            source={typeof court.image === 'string' ? { uri: court.image } : court.image} 
            style={styles.cardImage} 
          />
          <View style={styles.cardOverlay} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {court.name}
            </Text>
            <View style={styles.cardRow}>
              {renderStarRating(court.rating)}
              <Text style={styles.reviewCount}>
                ({court.reviewCount} reviews)
              </Text>
            </View>
            <View style={styles.cardRow}>
              <MapPin size={12} color={Colors.textSecondary} />
              <Text style={styles.cardAddress} numberOfLines={1}>
                {court.address}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image 
            source={require('../assets/images/logo/text-only.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.7}
          >
            <Menu size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courts by name or location..."
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={displayedCourts}
        renderItem={({ item }) => <CourtCard court={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreCourts}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No courts found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search query
            </Text>
          </View>
        }
        ListFooterComponent={
          filteredCourts.length > 0 ? (
            <View style={styles.footerContainer}>
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={Colors.primary} />
                  <Text style={styles.loadingText}>Loading more courts...</Text>
                </View>
              ) : hasMore ? (
                <Text style={styles.footerText}>
                  Showing {displayedCount} of {filteredCourts.length} courts
                </Text>
              ) : (
                <Text style={styles.footerText}>
                  All {filteredCourts.length} courts loaded
                </Text>
              )}
            </View>
          ) : null
        }
      />

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuModal}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity
                onPress={() => setMenuVisible(false)}
                style={styles.closeButton}
                activeOpacity={0.7}
              >
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.menuContent}>
              <TouchableOpacity 
                style={styles.menuItemTouchable}
                activeOpacity={0.7}
                onPress={() => {
                  setMenuVisible(false);
                  // Menu item 1 action would go here
                }}
              >
                <Text style={styles.menuItem}>Menu item 1</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.menuItemTouchable}
                activeOpacity={0.7}
                onPress={() => {
                  setMenuVisible(false);
                  // Menu item 2 action would go here
                }}
              >
                <Text style={styles.menuItem}>Menu item 2</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.menuItemTouchable}
                activeOpacity={0.7}
                onPress={() => {
                  setMenuVisible(false);
                  // Menu item 3 action would go here
                }}
              >
                <Text style={styles.menuItem}>Menu item 3</Text>
              </TouchableOpacity>
              <View style={styles.menuDivider} />
              <TouchableOpacity 
                style={styles.menuItemTouchable}
                activeOpacity={0.7}
                onPress={() => {
                  setMenuVisible(false);
                  // Settings action would go here
                }}
              >
                <Text style={styles.menuItem}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.menuItemTouchable}
                activeOpacity={0.7}
                onPress={() => {
                  setMenuVisible(false);
                  // About action would go here
                }}
              >
                <Text style={styles.menuItem}>About</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 69,
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: Colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
  },
  listContent: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  cardAddress: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
    marginLeft: 4,
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  menuModal: {
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: Colors.surface,
  },
  menuContent: {
    paddingVertical: 8,
  },
  menuItemTouchable: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItem: {
    fontSize: 18,
    color: Colors.text,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
});
