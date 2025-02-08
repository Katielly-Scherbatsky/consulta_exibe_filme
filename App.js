import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeCompletoErro, setNomeCompletoErro] = useState("");

  const [dataNascimento, setDataNascimento] = useState("");
  const [idade, setIdade] = useState(null);
  const [menorIdade, setMenorIdade] = useState(false);
  const [dataErro, setDataErro] = useState("");

  const [nomePai, setNomePai] = useState("");
  const [nomePaiErro, setNomePaiErro] = useState("");

  const [nomeMae, setNomeMae] = useState("");
  const [nomeMaeErro, setNomeMaeErro] = useState("");

  const [cpf, setCpf] = useState("");
  const [cpfErro, setCpfErro] = useState("");

  const [telefoneFixo, setTelefoneFixo] = useState("");
  const [telefoneFixoErro, setTelefoneFixoErro] = useState("");

  const [celular, setCelular] = useState("");
  const [celularErro, setCelularErro] = useState("");

  const [cep, setCep] = useState("");
  const [cepErro, setCepErro] = useState("");

  const [email, setEmail] = useState("");
  const [emailErro, setEmailErro] = useState("");

  const [senha, setSenha] = useState("");
  const [senhaErro, setSenhaErro] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [confirmarSenhaErro, setConfirmarSenhaErro] = useState("");

  const validarNomeCompleto = (name) => {
    if (!name.trim()) return "O nome não pode estar vazio.";
    const nomeSobrenome = name.trim().split(/\s+/);
    if (nomeSobrenome.length < 2) return "Informe o nome completo (Nome e Sobrenome).";
    return "";
  };

  const validarData = (text) => {
    let formatada = text
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
      .replace(/(\/\d{4})\d+?$/, "$1");

    setDataNascimento(formatada);

    if (formatada.length === 10) {
      const [dia, mes, ano] = formatada.split("/").map(Number);
      const data = new Date(ano, mes - 1, dia);
      const hoje = new Date();

      const dataValida = (date) => {
        return (
          date.getFullYear() === ano &&
          date.getMonth() === mes - 1 &&
          date.getDate() === dia
        );
      };

      if (
        data.getFullYear() < 1900 ||
        data > hoje ||
        !dataValida(data)
      ) {
        setDataErro("Data inválida.");
        setIdade(null);
        setMenorIdade(false);
      } else {
        setDataErro("");
        const calcularIdade = hoje.getFullYear() - data.getFullYear();
        setIdade(calcularIdade);
        setMenorIdade(calcularIdade < 18);

        // Verifica se a idade é menor que 18 e se os campos do pai e mãe estão preenchidos
        if (calcularIdade < 18) {
          if (!nomePai.trim()) {
            setNomePaiErro("O nome do pai é obrigatório para menores de 18 anos.");
          }
          if (!nomeMae.trim()) {
            setNomeMaeErro("O nome da mãe é obrigatório para menores de 18 anos.");
          }
        }
      }
    } else if (formatada.length > 0) {
      setDataErro("Data incompleta.");
      setIdade(null);
      setMenorIdade(false);
    } else {
      setDataErro("");
      setIdade(null);
      setMenorIdade(false);
    }
  };

  const validarNome = (name, field) => {
    if (menorIdade && !name.trim()) {
      return field === 'pai'
        ? "O nome do pai é obrigatório para menores de 18 anos."
        : "O nome da mãe é obrigatório para menores de 18 anos.";
    }
    return "";
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return "CPF inválido.";
    }

    const calcularDigito = (base) => {
      let soma = 0;
      for (let i = 0; i < base.length; i++) {
        soma += parseInt(base[i]) * (base.length + 1 - i);
      }
      let resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const primeiroDigito = calcularDigito(cpf.slice(0, 9));
    const segundoDigito = calcularDigito(cpf.slice(0, 10));

    if (primeiroDigito != cpf[9] || segundoDigito != cpf[10]) {
      return "CPF inválido.";
    }

    return "";
  };

  const validarTelefoneFixo = (telefone) => {
    const telefoneFormatado = telefone.replace(/\D/g, "");
    if (telefoneFormatado.length !== 10) return "Telefone fixo deve ter 10 dígitos (incluindo o DDD).";
    const padraoTelefoneFixo = /^\(\d{2}\)\s\d{4}-\d{4}$/;
    if (!padraoTelefoneFixo.test(telefone)) return "Formato de telefone fixo inválido. Use (XX) XXXX-XXXX.";
    return "";
  };

  const validarCelular = (telefone) => {
    const telefoneFormatado = telefone.replace(/\D/g, "");
    if (telefoneFormatado.length !== 11) return "Celular deve ter 11 dígitos (incluindo o DDD e o nono dígito).";
    const padraoCelular = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    if (!padraoCelular.test(telefone)) return "Formato de celular inválido. Use (XX) XXXXX-XXXX.";
    return "";
  };

  const formatarTelefoneFixo = (text) => {
    let formatado = text.replace(/\D/g, "");
    if (formatado.length <= 10) {
      formatado = formatado.replace(/^(\d{2})(\d)/, "($1) $2");
      formatado = formatado.replace(/(\d{4})(\d)/, "$1-$2");
    }
    return formatado;
  };

  const formatarCelular = (text) => {
    let formatado = text.replace(/\D/g, "");
    if (formatado.length <= 11) {
      formatado = formatado.replace(/^(\d{2})(\d)/, "($1) $2");
      formatado = formatado.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return formatado;
  };

  const validarCEP = (cep) => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      return true;
    }
    const formatoValido = /^[0-9]{5}-[0-9]{3}$/.test(cep);
    return formatoValido;
  };

  const formatarCEP = (text) => {
    let formatado = text.replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2");
    return formatado;
  };

  function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const validarSenha = (senha) => {
    if (!senha.trim()) return "A senha não pode estar vazia.";
    if (senha.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
    if (!/[A-Z]/.test(senha)) return "A senha deve conter pelo menos uma letra maiúscula.";
    if (!/[a-z]/.test(senha)) return "A senha deve conter pelo menos uma letra minúscula.";
    if (!/[0-9]/.test(senha)) return "A senha deve conter pelo menos um número.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) return "A senha deve conter pelo menos um caractere especial.";
    return "";
  };

  const validarConfirmarSenha = (senha, confirmarSenha) => {
    if (!confirmarSenha.trim()) return "Por favor, confirme a senha.";
    if (confirmarSenha !== senha) return "As senhas não coincidem.";
    return "";
  };

  const validarTodosCampos = () => {
    const erros = {
      nomeCompletoErro: validarNomeCompleto(nomeCompleto),
      dataErro: validarData(dataNascimento),
      nomePaiErro: validarNome(nomePai, 'pai'),
      nomeMaeErro: validarNome(nomeMae, 'mae'),
      cpfErro: validarCPF(cpf),
      telefoneFixoErro: validarTelefoneFixo(telefoneFixo),
      celularErro: validarCelular(celular),
      cepErro: validarCEP(formatarCEP(cep)),
      emailErro: validarEmail(email) ? "" : "Email inválido.",
      senhaErro: validarSenha(senha),
      confirmarSenhaErro: validarConfirmarSenha(senha, confirmarSenha)
    };

    setNomeCompletoErro(erros.nomeCompletoErro);
    setDataErro(erros.dataErro);
    setNomePaiErro(erros.nomePaiErro);
    setNomeMaeErro(erros.nomeMaeErro);
    setCpfErro(erros.cpfErro);
    setTelefoneFixoErro(erros.telefoneFixoErro);
    setCelularErro(erros.celularErro);
    setCepErro(erros.cepErro);
    setEmailErro(erros.emailErro);
    setSenhaErro(erros.senhaErro);
    setConfirmarSenhaErro(erros.confirmarSenhaErro);

    if (Object.values(erros).some(erro => erro)) {
      return false;
    }

    return true;
  };

  const enviarFormulario = () => {
    const camposValidos = validarTodosCampos();
    if (camposValidos) {
      alert("Formulário enviado com sucesso!");
    } else {
      alert("Por favor, corrija os erros no formulário.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#256" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.heading}>Informações Pessoais</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Completo:</Text>
              <TextInput
                style={[styles.inputStyle, nomeCompletoErro ? styles.inputError : null]}
                value={nomeCompleto}
                onChangeText={(text) => {
                  setNomeCompleto(text);
                  setNomeCompletoErro(validarNomeCompleto(text));
                }}
                onBlur={() => setNomeCompletoErro(validarNomeCompleto(nomeCompleto))}
              />
              {nomeCompletoErro ? <Text style={styles.errorMsg}>{nomeCompletoErro}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data de nascimento:</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="DD/MM/AAAA"
                style={[styles.inputStyle, dataErro ? styles.inputError : null]}
                maxLength={10}
                value={dataNascimento}
                onChangeText={(text) => {
                  validarData(text);
                }}
              />
              {dataErro ? <Text style={styles.errorMsg}>{dataErro}</Text> : null}
              {idade !== null && <Text style={styles.info}>Idade: {idade} anos</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome do Pai:</Text>
              <TextInput
                style={[styles.inputStyle, nomePaiErro ? styles.inputError : null]}
                value={nomePai}
                onChangeText={(text) => {
                  setNomePai(text);
                  setNomePaiErro(validarNome(text, 'pai'));
                }}
                onBlur={() => setNomePaiErro(validarNome(nomePai, 'pai'))}
              />
              {nomePaiErro ? <Text style={styles.errorMsg}>{nomePaiErro}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome da Mãe:</Text>
              <TextInput
                style={[styles.inputStyle, nomeMaeErro ? styles.inputError : null]}
                value={nomeMae}
                onChangeText={(text) => {
                  setNomeMae(text);
                  setNomeMaeErro(validarNome(text, 'mae'));
                }}
                onBlur={() => setNomeMaeErro(validarNome(nomeMae, 'mae'))}
              />
              {nomeMaeErro ? <Text style={styles.errorMsg}>{nomeMaeErro}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>CPF:</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="XXX.XXX.XXX-XX"
                style={[styles.inputStyle, cpfErro ? styles.inputError : null]}
                maxLength={14}
                value={cpf}
                onChangeText={(text) => {
                  let formatado = text
                    .replace(/\D/g, "")
                    .replace(/^(\d{3})(\d)/, "$1.$2")
                    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
                    .replace(/\.(\d{3})(\d)/, ".$1-$2")
                    .replace(/(-\d{2})\d+?$/, "$1");

                  setCpf(formatado);
                  setCpfErro(validarCPF(formatado));
                }}
                onBlur={() => setCpfErro(validarCPF(cpf))}
              />
              {cpfErro ? <Text style={styles.errorMsg}>{cpfErro}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone Fixo:</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="(XX) XXXX-XXXX"
                style={[styles.inputStyle, telefoneFixoErro ? styles.inputError : null]}
                maxLength={14}
                value={telefoneFixo}
                onChangeText={(text) => {
                  setTelefoneFixo(formatarTelefoneFixo(text));
                  setTelefoneFixoErro(validarTelefoneFixo(text));
                }}
                onBlur={() => setTelefoneFixoErro(validarTelefoneFixo(telefoneFixo))}
              />
              {telefoneFixoErro ? <Text style={styles.errorMsg}>{telefoneFixoErro}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Celular:</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="(XX) XXXXX-XXXX"
                style={[styles.inputStyle, celularErro ? styles.inputError : null]}
                maxLength={16}
                value={celular}
                onChangeText={(text) => {
                  setCelular(formatarCelular(text));
                  setCelularErro(validarCelular(text));
                }}
                onBlur={() => setCelularErro(validarCelular(celular))}
              />
              {celularErro ? <Text style={styles.errorMsg}>{celularErro}</Text> : null}
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.heading}>Endereço:</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>CEP:</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="XXXXX-XXX"
                style={[styles.inputStyle, cepErro ? styles.inputError : null]}
                maxLength={9}
                value={cep}
                onChangeText={(text) => {
                  setCep(formatarCEP(text));
                  setCepErro(validarCEP(text));
                }}
              />
              {cepErro ? <Text style={styles.errorMsg}>{cepErro}</Text> : null} { }
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Endereço:</Text>
              <TextInput style={styles.inputStyle} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Número:</Text>
              <TextInput style={styles.inputStyle} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Complemento:</Text>
              <TextInput style={styles.inputStyle} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cidade:</Text>
              <TextInput style={styles.inputStyle} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Estado:</Text>
              <TextInput style={styles.inputStyle} />
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.heading}>Informações da Conta:</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                keyboardType="email-address"
                placeholder="exemplo@dominio.com"
                style={[styles.inputStyle, emailErro ? styles.inputError : null]}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailErro(validarEmail(text) ? "" : "E-mail inválido.");
                }}
                onBlur={() => setEmailErro(validarEmail(email) ? "" : "E-mail inválido.")}
              />
              {emailErro ? <Text style={styles.errorMsg}>{emailErro}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha:</Text>
              <TextInput
                style={[styles.inputStyle, senhaErro ? styles.inputError : null]}
                value={senha}
                onChangeText={(text) => {
                  setSenha(text);
                  setSenhaErro(validarSenha(text));
                }}
                onBlur={() => setSenhaErro(validarSenha(senha))}
              />
              {senhaErro ? <Text style={styles.errorMsg}>{senhaErro}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Senha:</Text>
              <TextInput
                style={[styles.inputStyle, confirmarSenhaErro ? styles.inputError : null]}
                value={confirmarSenha}
                onChangeText={(text) => {
                  setConfirmarSenha(text);
                  setConfirmarSenhaErro(validarConfirmarSenha(senha, text));
                }}
                onBlur={() => setConfirmarSenhaErro(validarConfirmarSenha(senha, confirmarSenha))}
              />
              {confirmarSenhaErro ? <Text style={styles.errorMsg}>{confirmarSenhaErro}</Text> : null}
            </View>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={enviarFormulario} style={styles.button}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    marginBottom: 25,
    color: "#AFDDC2",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  label: {
    color: "#AFDDC2",
    fontSize: 18,
  },
  inputContainer: {
    width: "90%",
    fontSize: 15,
  },
  inputStyle: {
    width: "100%",
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#AFDDC2",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#F74722",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#AFDDC2",
    width: "70%",
    height: 45,
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#2D5B4F",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMsg: {
    fontWeight: "bold",
    color: "#F74722",
    marginBottom: 15,
  },
});