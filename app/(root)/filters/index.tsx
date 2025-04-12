import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define types for filter options
interface FilterOption {
  id: string;
  label: string;
  value: string | number;
}

// Filter options
const distanceOptions: FilterOption[] = [
  { id: 'd1', label: '5 miles', value: 5 },
  { id: 'd2', label: '10 miles', value: 10 },
  { id: 'd3', label: '15 miles', value: 15 },
  { id: 'd4', label: '25 miles', value: 25 },
  { id: 'd5', label: '50 miles', value: 50 },
  { id: 'd6', label: '100 miles', value: 100 },
];

const licenseOptions: FilterOption[] = [
  { id: 'l1', label: 'CNA', value: 'CNA' },
  { id: 'l2', label: 'LPN', value: 'LPN' },
  { id: 'l3', label: 'RN', value: 'RN' },
  { id: 'l4', label: 'STNA', value: 'STNA' },
  { id: 'l5', label: 'GNA', value: 'GNA' },
  { id: 'l6', label: 'LNA', value: 'LNA' },
  { id: 'l7', label: 'CMA', value: 'CMA' },
  { id: 'l8', label: 'LVN', value: 'LVN' },
];

const jobTypeOptions: FilterOption[] = [
  { id: 'j1', label: 'All', value: 'all' },
  { id: 'j2', label: 'Full-time', value: 'full-time' },
  { id: 'j3', label: 'Part-time', value: 'part-time' },
  { id: 'j4', label: 'Contract', value: 'contract' },
  { id: 'j5', label: 'Temporary', value: 'temporary' },
  { id: 'j6', label: 'Per Diem', value: 'per-diem' },
];

const dayOptions: FilterOption[] = [
  { id: 'day1', label: 'All Shifts', value: 'all' },
  { id: 'day2', label: 'Weekend', value: 'weekend' },
  { id: 'day3', label: 'Weekdays', value: 'weekdays' },
];

const FiltersScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistance, setSelectedDistance] = useState<string>('d1'); // Default: 5 miles
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>(['l1']); // Default: CNA
  const [selectedJobType, setSelectedJobType] = useState<string>('j1'); // Default: All
  const [selectedDay, setSelectedDay] = useState<string>('day1'); // Default: All Shifts
  
  // Toggle selection for options that allow multiple selections (licenses)
  const toggleLicenseSelection = (id: string) => {
    if (selectedLicenses.includes(id)) {
      setSelectedLicenses(selectedLicenses.filter(item => item !== id));
    } else {
      setSelectedLicenses([...selectedLicenses, id]);
    }
  };
  
  // Handle filter application
  const applyFilters = () => {
    // Get the selected values
    const distance = distanceOptions.find(option => option.id === selectedDistance)?.value;
    const licenses = selectedLicenses.map(id => 
      licenseOptions.find(option => option.id === id)?.value
    );
    const jobType = jobTypeOptions.find(option => option.id === selectedJobType)?.value;
    const day = dayOptions.find(option => option.id === selectedDay)?.value;
    
    // Construct filter object
    const filters = {
      search: searchQuery,
      distance,
      licenses,
      jobType,
      day
    };
    
    console.log('Applying filters:', filters);
    
    // Go back to previous screen and pass the filter data
    router.back();
    // In a real app, you would pass this data to the previous screen
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDistance('d1');
    setSelectedLicenses(['l1']);
    setSelectedJobType('j1');
    setSelectedDay('day1');
  };
  
  // Render filter section with options
  const renderFilterSection = (
    title: string, 
    options: FilterOption[], 
    selectedValue: string | string[], 
    onSelect: (id: string) => void,
    multiSelect: boolean = false
  ) => (
    <View className="mb-6">
      <Text className="font-semibold text-gray-800 mb-3">{title}</Text>
      <View className="flex-row flex-wrap">
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            className={`px-4 py-2 mr-2 mb-2 rounded-full border ${
              multiSelect 
                ? selectedValue.includes(option.id) ? 'bg-purple-100 border-purple-500' : 'border-gray-200 bg-white'
                : selectedValue === option.id ? 'bg-purple-100 border-purple-500' : 'border-gray-200 bg-white'
            }`}
            onPress={() => onSelect(option.id)}
          >
            <Text 
              className={`${
                multiSelect
                  ? selectedValue.includes(option.id) ? 'text-purple-500' : 'text-gray-700'
                  : selectedValue === option.id ? 'text-purple-500' : 'text-gray-700'
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 -ml-2"
        >
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-2">Filters</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Search */}
        <View className="my-4">
          <Text className="font-semibold text-gray-800 mb-3">Search</Text>
          <View className="flex-row items-center border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2 text-gray-800"
              placeholder="Skill, facility etc"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Distance Filter */}
        {renderFilterSection(
          'Distance from your address',
          distanceOptions,
          selectedDistance,
          (id) => setSelectedDistance(id)
        )}

        {/* License Filter */}
        {renderFilterSection(
          'Licence',
          licenseOptions,
          selectedLicenses,
          toggleLicenseSelection,
          true
        )}

        {/* Job Type Filter */}
        {renderFilterSection(
          'Job Type',
          jobTypeOptions,
          selectedJobType,
          (id) => setSelectedJobType(id)
        )}

        {/* Day Filter */}
        {renderFilterSection(
          'Day',
          dayOptions,
          selectedDay,
          (id) => setSelectedDay(id)
        )}

        {/* Shift Filter (placeholder) */}
        <View className="mb-6">
          <Text className="font-semibold text-gray-800 mb-3">Shift</Text>
          <Text className="text-gray-500">
            Shift selection options would appear here
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="px-4 py-4 border-t border-gray-100 flex-row">
        <TouchableOpacity 
          className="flex-1 mr-2 border border-gray-300 rounded-full py-3 items-center"
          onPress={resetFilters}
        >
          <Text className="text-gray-700 font-medium">Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 ml-2 bg-purple-500 rounded-full py-3 items-center"
          onPress={applyFilters}
        >
          <Text className="text-white font-medium">Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FiltersScreen; 