import { DrawerActions, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Clock, Menu, Search, Star } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
    {
        id: '1',
        name: 'Dentist',
        icon: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg',
        color: '#3B82F6',
    },
    {
        id: '2',
        name: 'Urologist',
        icon: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg',
        color: '#F97316',
    },
    {
        id: '3',
        name: 'Drugs',
        icon: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg',
        color: '#10B981',
    },
    {
        id: '4',
        name: 'Health',
        icon: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
        color: '#EF4D44',
    },
    {
        id: '5',
        name: 'Health',
        icon: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
        color: '#10B981',
    },
    {
        id: '6',
        name: 'Health',
        icon: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
        color: '#EF4444',
    },
];

const popularDoctors = [
    {
        id: '1',
        name: 'Sabrina Yasmin',
        specialty: 'Cardiologist',
        rating: 4.9,
        reviews: 1025,
        image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
        isOnline: true,
    },
    {
        id: '2',
        name: 'Dr. Michael ',
        specialty: 'Neurologist',
        rating: 4.7,
        reviews: 892,
        image: 'https://images.pexels.com/photos/6749767/pexels-photo-6749767.jpeg',
        isOnline: false,
    },
    {
        id: '3',
        name: 'Dr. Thompson',
        specialty: 'Neurologist',
        rating: 4.7,
        reviews: 892,
        image: 'https://images.pexels.com/photos/6749767/pexels-photo-6749767.jpeg',
        isOnline: false,
    },
    {
        id: '4',
        name: 'Dr. Michael Thompson',
        specialty: 'Neurologist',
        rating: 4.7,
        reviews: 892,
        image: 'https://images.pexels.com/photos/6749767/pexels-photo-6749767.jpeg',
        isOnline: false,
    },
];

const appointments = [
    {
        id: '1',
        doctorName: 'Dr. Sarah Wilson',
        specialty: 'Cardiologist',
        time: '10:00 AM',
        date: 'Today',
        image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    },
    {
        id: '2',
        doctorName: 'Dr. James Carter',
        specialty: 'Dentist',
        time: '2:30 PM',
        date: 'Tomorrow',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    },
    {
        id: '3',
        doctorName: 'Dr. James Carter',
        specialty: 'Dentist',
        time: '2:30 PM',
        date: 'Tomorrow',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    },
    {
        id: '4',
        doctorName: 'Dr. James Carter',
        specialty: 'Dentist',
        time: '2:30 PM',
        date: 'Tomorrow',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    },
    {
        id: '5',
        doctorName: 'Dr. James Carter',
        specialty: 'Dentist',
        time: '2:30 PM',
        date: 'Tomorrow',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    },
    {
        id: '6',
        doctorName: 'Dr. James Carter',
        specialty: 'Dentist',
        time: '2:30 PM',
        date: 'Tomorrow',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    },
    {
        id: '7',
        doctorName: 'Dr. Aliyana',
        specialty: 'Dentist',
        time: '2:30 PM',
        date: 'Tomorrow',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    },
];

const CategoryCard = ({ category }) => (
    <TouchableOpacity className="mr-4 rounded-2xl overflow-hidden">
        <LinearGradient
            colors={[category.color, category.color + 'CC']}
            style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center' }}
        >
            <Image source={{ uri: category.icon }} className="w-8 h-8 rounded-full mb-2" />
            <Text className="text-xs font-semibold text-white">{category.name}</Text>
        </LinearGradient>
    </TouchableOpacity>
);

const DoctorCard = ({ doctor }) => (
    <TouchableOpacity className="mr-4 rounded-2xl overflow-hidden">
        <LinearGradient
            colors={['#3B82F6', '#1D4ED8']}
            style={{ width: 160, padding: 16, height:110 }}
        >
            <View className="items-center mb-3">
                <Image source={{ uri: doctor.image }} className="w-15 h-15 rounded-full" />
                <View
                    className={`w-3 h-3 rounded-full absolute top-0 right-2 border-2 border-white ${doctor.isOnline ? 'bg-emerald-500' : 'bg-gray-400'}`}
                />
            </View>
            <Text className="text-base font-bold text-white text-center">{doctor.name}</Text>
            <Text className="text-xs text-white text-opacity-80 text-center">{doctor.specialty}</Text>
            <View className="flex-row items-center justify-center mt-1">
                <Star size={14} color="#FFC107" fill="#FFC107" />
                <Text className="text-xs text-white ml-1">{doctor.rating} ({doctor.reviews} Review)</Text>
            </View>
        </LinearGradient>
    </TouchableOpacity>
);

const AppointmentCard = ({ appointment }) => (
    <TouchableOpacity className="flex-row items-center bg-slate-50 p-4 rounded-xl mb-3">
        <Image source={{ uri: appointment.image }} className="w-12 h-12 rounded-full mr-4" />
        <View className="flex-1">
            <Text className="text-base font-bold text-gray-800">{appointment.doctorName}</Text>
            <Text className="text-xs text-gray-500">{appointment.specialty}</Text>
            <View className="flex-row items-center mt-1">
                <Clock size={14} color="#6B7280" />
                <Text className="text-xs text-gray-500 ml-1">{appointment.time} • {appointment.date}</Text>
            </View>
        </View>
        <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
);

export default function IndexScreen() {
    const navigation = useNavigation();

    return (
         <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
            <LinearGradient colors={['#3B82F6', '#1D4ED8']} className="flex-1">
                <View className="flex-row justify-between items-center px-5 py-3">
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Menu size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-sm text-white opacity-80">Welcome</Text>
                        <Text className="text-xl font-bold text-white">Junayed</Text>
                    </View>
                    <Image source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} className="w-10 h-10 rounded-full" />
                </View>

                <View className="flex-1">
                    <View className="px-5 mt-1.5">
                        <View className="flex-row items-center bg-white rounded-xl px-4 py-1">
                            <Search size={20} color="#6B7280" />
                            <TextInput
                                placeholder="Search"
                                className="flex-1 ml-3 text-base text-gray-800"
                                placeholderTextColor="#6B7280"
                            />
                        </View>
                    </View>

                    <View className="bg-white rounded-t-3xl mt-6 pt-6 flex-1">
                        <View className="px-2">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {categories.map((category) => <CategoryCard key={category.id} category={category} />)}
                        </ScrollView>
                        </View>

                        <View className="px-5 my-4">
                            <Text className="text-lg font-bold text-gray-800 mb-3">Popular Doctors</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {popularDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
                            </ScrollView>
                        </View>

                        <View className="px-5 mb-1 flex-1">
                            <Text className="text-lg font-bold text-gray-800 mb-3">Upcoming Appointments</Text>
                            <FlatList
                                data={appointments}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <AppointmentCard appointment={item} />}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 14 }}
                            />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}