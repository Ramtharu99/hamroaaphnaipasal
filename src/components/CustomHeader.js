import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';


const CustomHeader = ({
    title,
    leftType = 'back', // 'back', 'avatar', 'none'
    onBackPress,
    rightComponent,
    rightIcons = [] // array of { name, onPress, size?, color? }
}) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    const renderLeft = () => {
        if (leftType === 'back') {
            return (
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
            );
        } else if (leftType === 'avatar') {
            return (
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                        style={styles.avatar}
                    />
                </View>
            );
        } else if (leftType === 'backWithAvatar') {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                        style={styles.avatar}
                    />
                </View>
            );
        }
        return <View style={styles.placeholder} />;
    };

    return (
        <View style={styles.container}>
            {/* Left Section */}
            <View style={styles.leftContainer}>
                {renderLeft()}
            </View>

            {/* Center Section: Title */}
            <View style={styles.centerContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
            </View>

            {/* Right Section */}
            <View style={styles.rightContainer}>
                {rightComponent ? (
                    rightComponent
                ) : rightIcons && rightIcons.length > 0 ? (
                    <View style={styles.rightIconsContainer}>
                        {rightIcons.map((icon, idx) => (
                            <TouchableOpacity key={idx} onPress={icon.onPress} style={styles.iconButton}>
                                <Icon name={icon.name} size={icon.size || 20} color={icon.color || colors.textPrimary} />
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <TouchableOpacity style={styles.menuButton}>
                        <Icon name="ellipsis-vertical" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        zIndex: 10,
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backButton: {
        padding: 4,
        marginRight: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.border,
    },
    centerContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
        textAlign: 'center',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    menuButton: {
        padding: 6,
    },
    rightIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        paddingHorizontal: 4,
    },
    placeholder: {
        width: 24,
    }
});

export default CustomHeader;
