import { View, Text, StyleSheet } from 'react-native';

export default function OrganizationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organization</Text>
      <Text style={styles.subtitle}>
        Your organization dashboard will be built here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: { fontSize: 30, fontWeight: '800', color: '#0F172A' },
  subtitle: { marginTop: 12, fontSize: 16, color: '#64748B' },
});
