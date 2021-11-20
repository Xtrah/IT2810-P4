import React, { useState } from 'react';
import {
  AddIcon,
  Alert,
  Button,
  CheckIcon,
  Flex,
  FormControl,
  Input,
  Select,
  Text,
  TextArea,
  Image,
  Center,
  ScrollView,
} from "native-base";
import { useMutation } from '@apollo/client';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import pokemonTypes from '../constants/pokemonTypes';
import { CREATE_POKEMON } from '../utils/queries';
import { RootStackScreenProps } from '../types/navigation';

const notFoundImage = require('../assets/images/ImageNotFound.svg');

type Inputs = {
  name: string;
  description: string;
  primaryType: string;
  secondaryType: string;
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
function CreatePokemonScreen({
  navigation,
}: RootStackScreenProps<'Root'>) {
  const [createPokemon, { error, loading }] = useMutation(CREATE_POKEMON);

  // Form-inputs that require controlling outside of useForm()-hook
  const [imageUrl, setImageUrl] = useState('');
  const [secondaryType, setSecondaryType] = useState<string>('');

  // const history = useHistory();
  // Handle form-state and register input-elements for validation and submission
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  // Handle submission of data
  const onSubmit: SubmitHandler<Inputs> = (submitData) => {
    createPokemon({
      variables: {
        ...submitData,
        types: determineChosenTypes(submitData.primaryType, secondaryType),
      },
    })
      .then((res) =>
        navigation.navigate('PokemonCardScreen', {pokemonId: res.data.createPokemon._id})
      )
      // eslint-disable-next-line no-console
      .catch((err) => console.error('Create pokemon-request failed', err));
  };

  return (
    <ScrollView>
      <Center flex={1}>
        <form>
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormControl.Label>Name</FormControl.Label>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange } }) => (
                <Input
                  accessibilityLabel="Name"
                  type="text"
                  placeholder="Enter pokemon name"
                  borderColor="red.500"
                  onChange={(inputValue) => onChange(inputValue)}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Field is required!',
                },
                validate: (value) =>
                  value.length > 3 || 'Name must be more than 3 characters',
              }}
            />
            <FormControl.ErrorMessage>
              {errors.name && errors.name.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <Flex mt="10px">
            <FormControl isRequired isInvalid={!!errors.height}>
              <FormControl.Label>Height (inches)</FormControl.Label>
              <Controller
                control={control}
                name="height"
                render={({ field: { onChange } }) => (
                  <Input
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
                  validate: (value) =>
                  value > 0 || 'Height must be more than 0',
                }}
              />
              <FormControl.ErrorMessage>
                {errors.height && errors.height.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.weight}>
              <FormControl.Label>Weight (lbs)</FormControl.Label>
              <Controller
                control={control}
                name="weight"
                render={({ field: { onChange } }) => (
                  <Input
                    accessibilityLabel="Weight"
                    type="number"
                    placeholder="123"
                    borderColor="red.500"
                    onChangeText={(e) => onChange(parseInt(e, 10))}
                  />
                  )}
                rules={{
                  required: {
                    value: true,
                    message: 'Field is required!',
                  },
                  validate: (value) =>
                    value > 0 || 'Weight must be more than 0',
                }}
              />
              <FormControl.ErrorMessage>
                {errors.weight && errors.weight.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </Flex>
          <FormControl mt="10px" isRequired isInvalid={!!errors.primaryType}>
            <FormControl.Label>Primary type</FormControl.Label>
            <Controller
              control={control}
              name="primaryType"
              defaultValue="normal"
              render={({ field: { onChange, value } }) => (
                <Select
                  accessibilityLabel="Primary type"
                  placeholder="Select primary type"
                  borderColor="red.500"
                  selectedValue={value}
                  onValueChange={(inputValue: string) => onChange(inputValue)}
                >
                  {pokemonTypes.map((type: string) => (
                    <Select.Item key={type} label={type} value={type} />
                  ))}
                </Select>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Field is required!',
                },
              }}
            />
            <FormControl.ErrorMessage>
              {errors.primaryType && errors.primaryType.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt="10px" isInvalid={!!errors.secondaryType}>
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
            <FormControl.ErrorMessage>
              {errors.secondaryType && errors.secondaryType.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt="10px" isRequired isInvalid={!!errors.description}>
            <FormControl.Label>Description</FormControl.Label>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextArea
                  accessibilityLabel="Description of pokemon"
                  placeholder="Description of pokemon"
                  borderColor="red.500"
                  value={value}
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
          <FormControl mt="10px" isRequired isInvalid={!!errors.imageUrl}>
            <FormControl.Label>Image Url</FormControl.Label>
            <Controller
              control={control}
              name="imageUrl"
              render={({ field: { onChange, value } }) => (
                <Input
                  accessibilityLabel="Image url"
                  type="text"
                  placeholder="Enter url for image of pokemon"
                  borderColor="red.500"
                  value={value}
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
            boxSize="350px"
            resizeMode="contain"
            source={{ uri: imageUrl }}
            fallbackSource={{
              uri: notFoundImage,
            }}
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
            bgColor="red.500"
            color="white"
            size="lg"
            w="100%"
            isLoading={isSubmitting}
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
            leftIcon={loading ? <CheckIcon /> : <AddIcon />}
          >
            {loading ? (
              <Text>Submitting ...</Text>
            ) : (
              <Text>Create Pokemon</Text>
            )}
          </Button>
        </form>
      </Center>
    </ScrollView>
  );
}

export default CreatePokemonScreen;

