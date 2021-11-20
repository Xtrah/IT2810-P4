import React, { useState } from 'react';
import {
  AddIcon,
  Alert,
  Button,
  CheckIcon,
  FormControl,
  Input,
  Select,
  Text,
  TextArea,
  Image,
  ScrollView,
  Center,
} from 'native-base';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_POKEMON } from '../utils/queries';
import pokemonTypes from '../constants/pokemonTypes';
import { RootStackScreenProps } from '../types/navigation';

type Inputs = {
  pokemonName: string;
  description: string;
  height: number;
  weight: number;
  imageUrl: string;
};

// Returns type(s) based on two type-inputs
const determineChosenTypes = (primaryType: string, secondaryType: string) => {
  // Return only primary if no secondary has been chosen or if secondary and primary are the same
  if (!secondaryType.length || secondaryType === primaryType) {
    return [primaryType];
  }
  return [primaryType, secondaryType];
};

// CreatePokemon is the page component for creating new pokemons
function CreatePokemonScreen({ navigation }: RootStackScreenProps<'Root'>) {
  const [createPokemon, { error, loading }] = useMutation(CREATE_POKEMON);

  // Form-inputs that require controlling outside of useForm()-hook
  const [imageUrl, setImageUrl] = useState('');
  const [primaryType, setPrimaryType] = useState<string>('normal');
  const [secondaryType, setSecondaryType] = useState<string>('');

  // Handle form-state and register input-elements for validation and submission
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  // Handle submission of data
  const onSubmit: SubmitHandler<Inputs> = (submitData) => {
    console.log(submitData);
    console.log(primaryType);
    console.log(secondaryType);
    createPokemon({
      variables: {
        name: submitData.pokemonName,
        description: submitData.description,
        height: submitData.height,
        weight: submitData.weight,
        imageUrl: submitData.imageUrl,
        types: determineChosenTypes(primaryType, secondaryType),
      },
    })
      .then((res) =>
        navigation.navigate('PokemonCardScreen', {
          pokemonId: res.data.createPokemon._id,
        })
      )
      // eslint-disable-next-line no-console
      .catch((err) => console.error('Create pokemon-request failed', err));
  };

  return (
    <ScrollView p={6}>
      <Center>
        <FormControl isRequired isInvalid={'pokemonName' in errors}>
          <FormControl.Label>Name</FormControl.Label>
          <Controller
            control={control}
            name="pokemonName"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Enter pokemon name"
                accessibilityLabel="Pokemon Name"
                type="text"
                borderColor="red.500"
                onChangeText={(inputValue) => onChange(inputValue)}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Field is required!',
              },
              minLength: {
                value: 3,
                message: 'Name must be more than 3 characters long',
              },
              maxLength: {
                value: 25,
                message: 'Name cannot be longer than 25 characters long',
              },
            }}
          />
          <FormControl.ErrorMessage>
            {errors.pokemonName && errors.pokemonName.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt="10px" isRequired isInvalid={'height' in errors}>
          <FormControl.Label>Height (inches)</FormControl.Label>
          <Controller
            control={control}
            name="height"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                placeholder="123"
                accessibilityLabel="Height"
                type="number"
                mr="5px"
                borderColor="red.500"
                onChangeText={(e) => onChange(parseInt(e, 10))}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Field is required!',
              },
              validate: (value) => value > 0 || 'Height must be more than 0',
            }}
          />
          <FormControl.ErrorMessage>
            {errors.height && errors.height.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt="10px" isRequired isInvalid={'weight' in errors}>
          <FormControl.Label>Weight (lbs)</FormControl.Label>
          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                placeholder="123"
                accessibilityLabel="Weight"
                type="number"
                borderColor="red.500"
                onChangeText={(e) => onChange(parseInt(e, 10))}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Field is required!',
              },
              validate: (value) => value > 0 || 'Weight must be more than 0',
            }}
          />
          <FormControl.ErrorMessage>
            {errors.weight && errors.weight.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt="10px" isRequired>
          <FormControl.Label>Primary type</FormControl.Label>
          <Select
            accessibilityLabel="Primary type"
            placeholder="Select primary type"
            borderColor="red.500"
            selectedValue={primaryType}
            onValueChange={(inputValue: string) => setPrimaryType(inputValue)}
          >
            {pokemonTypes.map((type: string) => (
              <Select.Item key={type} label={type} value={type} />
            ))}
          </Select>
        </FormControl>
        <FormControl mt="10px">
          <FormControl.Label>Secondary type (optional)</FormControl.Label>
          <Select
            placeholder="Select secondary type"
            borderColor="red.500"
            selectedValue={secondaryType}
            onValueChange={(value) => setSecondaryType(value)}
          >
            {pokemonTypes.map((type: string) => (
              <Select.Item key={type} label={type} value={type} />
            ))}
          </Select>
        </FormControl>
        <FormControl mt="10px" isRequired isInvalid={'description' in errors}>
          <FormControl.Label>Description</FormControl.Label>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur } }) => (
              <TextArea
                onBlur={onBlur}
                accessibilityLabel="Description of pokemon"
                placeholder="Description of pokemon"
                borderColor="red.500"
                onChangeText={(inputValue) => onChange(inputValue)}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Field is required!',
              },
            }}
          />
          <FormControl.ErrorMessage>
            {errors.description && errors.description.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt="10px" isRequired isInvalid={'imageUrl' in errors}>
          <FormControl.Label>Image Url</FormControl.Label>
          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { onChange } }) => (
              <Input
                accessibilityLabel="Image url"
                type="text"
                placeholder="Enter url for image of pokemon"
                borderColor="red.500"
                onChangeText={(inputValue) => {
                  onChange(inputValue);
                  setImageUrl(inputValue);
                }}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Field is required!',
              },
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.imageUrl && errors.imageUrl.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl.Label mt="10px">Image preview</FormControl.Label>
        <Image
          key={imageUrl}
          boxSize="250px"
          resizeMode="contain"
          // eslint-disable-next-line global-require
          source={
            imageUrl
              ? { uri: imageUrl }
              : // eslint-disable-next-line global-require
                require('../assets/images/ImageNotFound.png')
          }
          // eslint-disable-next-line global-require
          fallbackSource={require('../assets/images/ImageNotFound.png')}
          alt="Pokemon"
          borderColor="red.500"
        />
        {error && (
          <Alert status="error" mb="10px">
            <Alert.Icon />
            Something went wrong! Please try again
          </Alert>
        )}
        <Button
          variant="solid"
          bgColor="red.500"
          size="lg"
          w="100%"
          mb={10}
          isLoading={loading}
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
          leftIcon={loading ? <CheckIcon /> : <AddIcon />}
        >
          <Text color="#FFFFFF" fontWeight="bold">
            {loading ? 'Submitting ...' : 'Create Pokemon'}
          </Text>
        </Button>
      </Center>
    </ScrollView>
  );
}

export default CreatePokemonScreen;
