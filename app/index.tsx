import { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TelaCalculadora() {
  const [numeroAtual, setNumeroAtual] = useState("0");
  const [resultadoAnterior, setResultadoAnterior] = useState<number | null>(null);
  const [operacao, setOperacao] = useState<string | null>(null);

  const digitarNum = (n: string) => {
    setNumeroAtual(numeroAtual === "0" ? n : numeroAtual + n);
  };

  const definirOperacao = (op: string) => {
    setResultadoAnterior(parseFloat(numeroAtual));
    setOperacao(op);
    setNumeroAtual("0");
  };

  const calcular = () => {
    const n1 = resultadoAnterior;
    const n2 = parseFloat(numeroAtual);
    if (n1 === null || !operacao) return;

    let res = 0;
    switch (operacao) {
      case "+": res = n1 + n2; break;
      case "-": res = n1 - n2; break;
      case "*": res = n1 * n2; break;
      case "/": res = n2 !== 0 ? n1 / n2 : 0; break;
    }

    setNumeroAtual(res.toString());
    setResultadoAnterior(null);
    setOperacao(null);
  };

  const limpar = () => {
    setNumeroAtual("0");
    setResultadoAnterior(null);
    setOperacao(null);
  };

  const Botao = ({ label, onPress, cor = '#A2BCEB', flex = 1 }: any) => (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: cor, flex: flex }]} 
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.visor}>
        <Text style={styles.historico}>{resultadoAnterior} {operacao}</Text>
        <Text style={styles.textoPrincipal}>{numeroAtual}</Text>
      </View>

      <View style={styles.grade}>
        <View style={styles.linha}>
          <Botao label="C" onPress={limpar} cor="#3a4a80ff" />
          <Botao label="√" onPress={() => setNumeroAtual(Math.sqrt(parseFloat(numeroAtual)).toString())} cor="#0080b3ff" />
          <Botao label="/" onPress={() => definirOperacao("/")} cor="#0080b3ff" />
          <Botao label="*" onPress={() => definirOperacao("*")} cor="#0080b3ff" />
        </View>

        <View style={styles.linha}>
          <Botao label="7" onPress={() => digitarNum("7")} />
          <Botao label="8" onPress={() => digitarNum("8")} />
          <Botao label="9" onPress={() => digitarNum("9")} />
          <Botao label="-" onPress={() => definirOperacao("-")} cor="#0080b3ff" />
        </View>

        <View style={styles.linha}>
          <Botao label="4" onPress={() => digitarNum("4")} />
          <Botao label="5" onPress={() => digitarNum("5")} />
          <Botao label="6" onPress={() => digitarNum("6")} />
          <Botao label="+" onPress={() => definirOperacao("+")} cor="#0080b3ff" />
        </View>

        <View style={styles.linha}>
          <Botao label="1" onPress={() => digitarNum("1")} />
          <Botao label="2" onPress={() => digitarNum("2")} />
          <Botao label="3" onPress={() => digitarNum("3")} />
          <Botao label="=" onPress={calcular} cor="#4D8CE3" />
        </View>

        <View style={styles.linha}>
          <Botao label="0" onPress={() => digitarNum("0")} flex={2} />
          <Botao label="." onPress={() => digitarNum(".")} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  justifyContent: 'flex-end',
  visor: { flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 },
  historico: { color: '#888', fontSize: 24, marginBottom: 5 },
  textoPrincipal: { color: '#000', fontSize: 70, fontWeight: '300' },
  grade: { paddingBottom: 20 },
  linha: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  button: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal: 5,
  },
  buttonText: { color: '#000', fontSize: 30, fontWeight: '500' },
});