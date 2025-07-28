import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { CircleCheck as CheckCircle, MapPin, Star, Stethoscope } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const doctors = [
  {
    id: '1',
    name: 'Dr. Taylor Green',
    specialty: 'Cardiologist',
    distance: '22km',
    rating: 4.5,
    reviews: 1258,
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    availableRemotely: true,
    availability: [
      { date: 'Mar 11', status: 'available' },
      { date: 'Mar 12', status: 'unavailable' },
      { date: 'Mar 13', status: 'available' },
      { date: 'Mar 14', status: 'available' },
    ],
  },
  // ... other doctors
];

const DoctorCard = ({ doctor }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        color={i < Math.floor(rating) ? '#FFC107' : '#E0E0E0'}
        fill={i < Math.floor(rating) ? '#FFC107' : '#E0E0E0'}
      />
    ));
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl m-2 p-5 shadow-lg"
      onPress={() => router.push('/doctor-details')}
      activeOpacity={0.9}
    >
      {doctor.availableRemotely && (
        <View className="flex-row items-center self-start mb-4 rounded-full bg-green-50 px-3 py-1.5">
          <CheckCircle size={16} color="#4CAF50" />
          <Text className="text-xs font-semibold text-green-600 ml-1.5">Available Remotely</Text>
        </View>
      )}

      <View className="flex-row mb-5">
        <Image source={{ uri: doctor.image }} className="w-15 h-15 rounded-full bg-gray-200 mr-4" />
        <View className="flex-1">
          <View className="flex-row items-center mb-1.5">
            <Text className="text-xl font-bold text-gray-900 mr-2">{doctor.name}</Text>
            {doctor.verified && <CheckCircle size={18} color="#2196F3" fill="#2196F3" />}
          </View>
          <View className="flex-row items-center mb-2">
            <Stethoscope size={16} color="#6B7280" />
            <Text className="text-sm text-gray-500 ml-1">{doctor.specialty}</Text>
            <View className="w-1 h-1 rounded-full bg-gray-300 mx-2" />
            <MapPin size={16} color="#6B7280" />
            <Text className="text-sm text-gray-500 ml-1">{doctor.distance}</Text>
          </View>
          <View className="flex-row items-center">
            <View className="flex-row mr-2">{renderStars(doctor.rating)}</View>
            <Text className="text-sm font-semibold text-gray-700">
              {doctor.rating} ({doctor.reviews.toLocaleString()})
            </Text>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
        {doctor.availability.map((slot, index) => {
          const isSelected = selectedDate === slot.date;
          const isAvailable = slot.status === 'available';

          return (
            <TouchableOpacity
              key={index}
              onPress={() => isAvailable && setSelectedDate(slot.date)}
              disabled={!isAvailable}
              className={`px-4 py-3 rounded-xl mr-3 min-w-[80px] items-center border-2 ${
                isSelected
                  ? 'bg-green-600 border-green-600'
                  : isAvailable
                  ? 'bg-green-50 border-green-600'
                  : 'bg-gray-100 border-gray-300'
              }`}
            >
              <Text
                className={`text-xs font-semibold mb-0.5 ${
                  isSelected
                    ? 'text-white'
                    : isAvailable
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                {slot.date}
              </Text>
              <Text
                className={`text-[10px] font-medium ${
                  isSelected
                    ? 'text-white'
                    : isAvailable
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                {slot.status === 'available' ? 'Available' : 'Unavailable'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </TouchableOpacity>
  );
};

export default function AppointmentsBookingScreen() {
  return (
      <SafeAreaView className="flex-1">
          <LinearGradient colors={['#3B82F6', '#1D4ED8']} className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-5 pb-4 bg-white">
            <Text className="text-3xl font-bold mb-1">Find Doctors</Text>
            <Text className="text-base ">Book appointments with top-rated doctors</Text>
          </View>
          <View className="px-4">
            <Carousel
              loop
              width={width - 32}
              height={280}
              data={doctors}
              scrollAnimationDuration={500}
              renderItem={({ item }) => <DoctorCard doctor={item} />}
              mode="parallax"
              modeConfig={{ parallaxScrollingScale: 0.9, parallaxScrollingOffset: 50 }}
            />
          </View>
          <View className="h-10" />
        </ScrollView>
    </LinearGradient>
      </SafeAreaView>
  );
}
