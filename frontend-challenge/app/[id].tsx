import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Star, Plus, X } from 'lucide-react-native';
import { courts } from '../data/courts';
import { Colors } from '../constants/colors';
import { Review } from '../types';

export default function CourtDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const court = courts.find((c) => c.id === id);
  const [reviews, setReviews] = useState<Review[]>(court?.reviews || []);
  const [modalVisible, setModalVisible] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  if (!court) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Court not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddReview = () => {
    if (!newReview.comment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }

    const review: Review = {
      id: `r${Date.now()}`,
      user: 'You',
      comment: newReview.comment,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
    };

    // Optimistic UI update
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setModalVisible(false);
  };

  const renderStars = (rating: number, size: number = 16, interactive: boolean = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          disabled={!interactive}
          onPress={() => interactive && setNewReview({ ...newReview, rating: i })}
          activeOpacity={0.7}
          style={i < 5 ? { marginRight: 4 } : undefined}
        >
          <Star
            size={size}
            fill={i <= rating ? Colors.star : 'none'}
            color={i <= rating ? Colors.star : Colors.border}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.starsRow}>{stars}</View>;
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / reviews.length
    : court.rating;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image 
            source={typeof court.image === 'string' ? { uri: court.image } : court.image} 
            style={styles.heroImage} 
          />
          <View style={styles.heroOverlay} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.courtName}>{court.name}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(Math.round(averageRating), 20)}
            <Text style={styles.ratingValue}>{averageRating.toFixed(1)}</Text>
            <Text style={styles.reviewCountText}>({reviews.length} reviews)</Text>
          </View>

          <Text style={styles.address}>{court.address}</Text>

          {/* Amenities Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.amenitiesScroll}
            contentContainerStyle={styles.amenitiesContent}
          >
            {court.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityChip}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.length > 0 ? (
            reviews.map((review: Review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                {renderStars(review.rating, 14)}
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noReviews}>No reviews yet</Text>
          )}
        </View>

        {/* Tennis Ball Footer */}
        <View style={styles.tennisBallContainer}>
          <Image 
            source={require('../assets/images/logo/main-logo.png')} 
            style={styles.tennisBall}
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Plus size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Review Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Leave a Review</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                activeOpacity={0.7}
              >
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Rating</Text>
            <View style={styles.modalStars}>
              {renderStars(newReview.rating, 32, true)}
            </View>

            <Text style={styles.modalLabel}>Your Comment</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Share your experience..."
              placeholderTextColor={Colors.textSecondary}
              multiline
              numberOfLines={4}
              value={newReview.comment}
              onChangeText={(text: string) => setNewReview({ ...newReview, comment: text })}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddReview}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  courtName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  reviewCountText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  address: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  amenitiesScroll: {
    marginHorizontal: -20,
  },
  amenitiesContent: {
    paddingHorizontal: 20,
  },
  amenityChip: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  amenityText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  reviewsSection: {
    padding: 20,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  reviewDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  reviewComment: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 8,
    lineHeight: 20,
  },
  noReviews: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    marginTop: 16,
  },
  modalStars: {
    alignItems: 'center',
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tennisBallContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingBottom: 40,
  },
  tennisBall: {
    width: 100,
    height: 100,
    opacity: 0.8,
  },
});
