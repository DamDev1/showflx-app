import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const regularTabs = state.routes.filter(route => route.name !== 'search');
    const searchTab = state.routes.find(route => route.name === 'search');

    const renderTab = (route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                    ? options.title
                    : route.name;

        const isFocused = state.index === state.routes.indexOf(route);

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        };

        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
        };

        return (
            <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tab}
                activeOpacity={0.7}
            >
                <View style={styles.iconContainer}>
                    {options.tabBarIcon?.({
                        focused: isFocused,
                        color: isFocused ? '#000000' : '#666666',
                        size: 23,
                    })}
                </View>
                <Text style={[styles.label, isFocused && styles.labelFocused]}>
                    {typeof label === 'string'
                        ? label
                        : label({
                            focused: isFocused,
                            color: isFocused ? '#000000' : '#666666',
                            position: 'below-icon',
                            children: options.title ?? route.name,
                        })}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderSearchButton = () => {
        if (!searchTab) return null;

        const { options } = descriptors[searchTab.key];
        const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                    ? options.title
                    : searchTab.name;

        const isFocused = state.index === state.routes.indexOf(searchTab);

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: searchTab.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(searchTab.name);
            }
        };

        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: searchTab.key,
            });
        };

        return (
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.searchButton}
                activeOpacity={0.7}
            >
                {options.tabBarIcon?.({
                    focused: isFocused,
                    color: '#FFFFFF',
                    size: 20,
                })}
                <Text style={styles.searchLabel}>
                    {typeof label === 'string'
                        ? label
                        : label({
                            focused: isFocused,
                            color: '#FFFFFF',
                            position: 'below-icon',
                            children: options.title ?? searchTab.name,
                        })}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                {regularTabs.map((route, index) => renderTab(route, index))}
            </View>
            {renderSearchButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: Platform.OS === 'ios' ? 40 : 10,
        paddingHorizontal: 16,
        paddingTop: 10,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-end',
    },
    tabBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        backdropFilter: 'blur(10px)',
        gap: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 16,
        gap: 4,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 11,
        fontWeight: '500',
        color: '#666666',
        textAlign: 'center',
    },
    labelFocused: {
        color: '#000000',
        fontWeight: '600',
    },
    searchButton: {
        backgroundColor: '#1A1A1A',
        paddingVertical: 13,
        borderRadius: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
        minWidth: 100,
    },
    searchLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#FFFFFF',
    },
});