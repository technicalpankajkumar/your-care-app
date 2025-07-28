import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    Award,
    Calendar,
    Heart,
    Mail,
    MapPin,
    Phone,
    Star,
    Users,
    Video,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const timeSlots = [
  '10:00 AM', '02:30 PM', '03:00 PM', '04:30 AM',
  '04:30 AM', '06:00 PM', '12:30 PM', '06:00 AM'
];

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const dates = [22, 23, 24, 25, 26, 27, 28];

export default function DoctorDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(25);
  const [selectedTime, setSelectedTime] = useState('06:00 AM');
  const [isFavorite, setIsFavorite] = useState(false);

  const doctor = {
    id: '1',
    name: 'Dr. Michael Mink',
    specialty: 'Dental Care Specialist',
    consultFee: '180$',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    hospital: 'UK Medical College',
    patients: '200+',
    experience: '8 Year',
    rating: '4.18',
    about: 'Dr. Michael Mink is a devoted general dentist at UK Medical College, England, committed to patients care, community support, enhancing healthy, confident smiles.',
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color={index < Math.floor(rating) ? '#FFC107' : '#E0E0E0'}
        fill={index < Math.floor(rating) ? '#FFC107' : '#E0E0E0'}
      />
    ));
  };

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-slate-200">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">Doctor Details</Text>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className="p-2">
            <Heart
              size={24}
              color={isFavorite ? "#EF4444" : "#6B7280"}
              fill={isFavorite ? "#EF4444" : "transparent"}
            />
          </TouchableOpacity>
        </View>

        {/* Doctor Card */}
        <View className="mx-5 mt-5 rounded-2xl shadow-md overflow-hidden">
          <LinearGradient colors={['#3B82F6', '#1D4ED8']} className="p-5">
            <View className="flex-row items-center">
              <Image source={{ uri: doctor.image }} className="w-20 h-20 rounded-full mr-4" />
              <View className="flex-1">
                <Text className="text-white text-xl font-bold mb-1">{doctor.name}</Text>
                <Text className="text-white text-sm opacity-90 mb-1">{doctor.specialty}</Text>
                <Text className="text-white text-sm opacity-90 mb-2">{doctor.consultFee} Consult Fee</Text>
                <View className="flex-row items-center mb-3">
                  <MapPin size={16} color="#fff" />
                  <Text className="text-white text-sm ml-2">{doctor.hospital}</Text>
                </View>
                <View className="flex-row">
                  {[Mail, Phone, Video].map((Icon, i) => (
                    <TouchableOpacity key={i} className="bg-white p-2 rounded-lg mr-2">
                      <Icon size={20} color="#3B82F6" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View className="flex-row bg-white mx-5 my-5 rounded-2xl p-5 shadow-sm">
          {[
            { Icon: Users, value: doctor.patients, label: 'Patients', color: '#3B82F6' },
            { Icon: Award, value: doctor.experience, label: 'Experience', color: '#10B981' },
            { Icon: Star, value: doctor.rating, label: 'Ratings', color: '#F59E0B' },
          ].map(({ Icon, value, label, color }, i) => (
            <View key={i} className="flex-1 items-center">
              <Icon size={24} color={color} />
              <Text className="text-lg font-bold text-gray-800 mt-2 mb-1">{value}</Text>
              <Text className="text-xs text-gray-500">{label}</Text>
            </View>
          ))}
        </View>

        {/* About Doctor */}
        <View className="bg-white mx-5 mb-5 rounded-2xl p-5 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-3">About Doctor</Text>
          <Text className="text-sm text-gray-500 leading-5">{doctor.about}</Text>
        </View>

        {/* Select Date & Time */}
        <View className="bg-white mx-5 mb-5 rounded-2xl p-5 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Select Date & Time</Text>
            <View className="flex-row items-center bg-slate-100 px-3 py-1.5 rounded-md">
              <Calendar size={16} color="#6B7280" />
              <Text className="text-sm text-gray-500 ml-2">Feb 2025</Text>
            </View>
          </View>

          {/* Dates */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
            {dates.map((date, index) => (
              <TouchableOpacity
                key={date}
                className={`items-center px-4 py-3 rounded-xl mr-3 min-w-[60px] ${selectedDate === date ? 'bg-amber-500' : 'bg-slate-100'}`}
                onPress={() => setSelectedDate(date)}
              >
                <Text className={`text-xs mb-1 ${selectedDate === date ? 'text-white' : 'text-gray-500'}`}>{weekDays[index]}</Text>
                <Text className={`text-base font-bold ${selectedDate === date ? 'text-white' : 'text-gray-800'}`}>{date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Time Slots */}
          <View className="flex-row flex-wrap gap-3">
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                onPress={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded-lg border ${selectedTime === time ? 'bg-amber-500 border-amber-500' : 'bg-slate-100 border-slate-200'}`}
              >
                <Text className={`${selectedTime === time ? 'text-white' : 'text-gray-500'} text-sm font-medium`}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>

      {/* Book Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-slate-200">
        <TouchableOpacity className="rounded-xl overflow-hidden">
          <LinearGradient colors={['#10B981', '#059669']} className="py-4 items-center">
            <Text className="text-white text-base font-bold">Book Appointment</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
