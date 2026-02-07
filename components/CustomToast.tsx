import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';

type CustomToastProps = BaseToastProps & {
    text1?: string;
    text2?: string;
    type?: string;
};

const CustomToast = ({ text1, text2, type }: CustomToastProps) => {
    let backgroundColor = 'bg-gray-800';
    let iconName: keyof typeof Ionicons.glyphMap = 'information-circle';
    let iconColor = 'text-blue-500';

    switch (type) {
        case 'success':
            backgroundColor = 'bg-green-900/90';
            iconName = 'checkmark-circle';
            iconColor = 'text-green-400';
            break;
        case 'error':
            backgroundColor = 'bg-red-900/90';
            iconName = 'alert-circle';
            iconColor = 'text-red-400';
            break;
        case 'info':
        default:
            backgroundColor = 'bg-blue-900/90';
            iconName = 'information-circle';
            iconColor = 'text-blue-400';
            break;
    }

    return (
        <View className={`flex-row items-center w-[90%] p-4 rounded-xl shadow-lg ${backgroundColor} border border-white/10`}>
            <Ionicons name={iconName} size={24} className={iconColor} color={type === 'success' ? '#4ade80' : type === 'error' ? '#f87171' : '#60a5fa'} />
            <View className="ml-3 flex-1">
                {text1 && <Text className="text-white font-bold text-base">{text1}</Text>}
                {text2 && <Text className="text-gray-300 text-sm mt-1">{text2}</Text>}
            </View>
        </View>
    );
};

export const toastConfig = {
    success: (props: CustomToastProps) => <CustomToast {...props} type="success" />,
    error: (props: CustomToastProps) => <CustomToast {...props} type="error" />,
    info: (props: CustomToastProps) => <CustomToast {...props} type="info" />,
};
