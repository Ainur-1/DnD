import { FormField } from "@/shared/types/IFormField";
import { Item, ItemBase } from "./types";
import { isDecimal } from "@/shared/utils/isDecimal";
import { ArmorType, Dice, WeaponAttackType, WeaponDamageType, WeaponProficiencyType, WeaponProperty } from "@/shared/api/gql/graphql";

interface ItemFormBaseState {    
  /* common props */
  name: FormField<string>;
  iconBase64: FormField<string | null>;
  weightInPounds: FormField<number>;
  description: FormField<string | null>;
  costInGold: FormField<number>;
  tags: FormField<string[]>;

  /* weapon only */
  damageType?: FormField<WeaponDamageType>;
  attackType?: FormField<WeaponAttackType>;
  proficiencyType?: FormField<WeaponProficiencyType>;
  normalDistanceInFoots?: FormField<number | null>;
  criticalDistanceInFoots?: FormField<number | null>;
  properties?: FormField<WeaponProperty[] | null>;
  hitDice?: FormField<Dice>;
  alternateHitDice?: FormField<Dice | null>;

  /* armor only */
  armorType?: FormField<ArmorType>;
  material?: FormField<string>;
  requiredStrength?: FormField<number | null>;
  hasStealthDisadvantage?: FormField<boolean>;
  maxPossibleDexterityModifier?: FormField<number | null>;
  armorClass?: FormField<number>;
}

enum SelectedItemForm {
    weapon,
    armor,
    stuff,
}

interface ItemFormBaseStateWithFormSelector extends ItemFormBaseState {
    /* form selector */
    selectedForm: SelectedItemForm,
    formError: string | null, 
} 

type ItemFromBaseKeys = keyof ItemFormBaseState;

enum ItemFormBaseActionType {
    setFormError,
    setFormProperty,
    selectForm,
    resetForm,
}

type ItemFormBaseAction =
  | { type: ItemFormBaseActionType.selectForm; form: SelectedItemForm }
  | { type: ItemFormBaseActionType.setFormProperty; field: ItemFromBaseKeys; value: any; error?: string }
  | { type: ItemFormBaseActionType.setFormError; error: string | null }
  | { type: ItemFormBaseActionType.resetForm; newFormType?: SelectedItemForm};

const initialState: ItemFormBaseStateWithFormSelector = {
    selectedForm: SelectedItemForm.stuff,
    formError: null,

    name: {
        value: undefined,
        error: null
    },
    iconBase64: {
        value: undefined,
        error: null
    },
    weightInPounds: {
        value: 0,
        error: null
    },
    description: {
        value: null,
        error: null
    },
    costInGold: {
        value: 0,
        error: null
    },
    tags: {
        value: [],
        error: null
    }
}

function resetWeaponProperties(state: ItemFormBaseStateWithFormSelector) {
    state.damageType = undefined;
    state.attackType = undefined;
    state.proficiencyType = undefined;
    state.normalDistanceInFoots = undefined;
    state.criticalDistanceInFoots = undefined;
    state.properties = undefined;   
    state.hitDice = undefined;
    state.alternateHitDice = undefined;
}

function resetArmorProperties(state: ItemFormBaseStateWithFormSelector) {
    state.armorType = undefined;
    state.material = undefined;
    state.requiredStrength = undefined;
    state.hasStealthDisadvantage = undefined;
    state.maxPossibleDexterityModifier = undefined;
    state.armorClass = undefined;
}

function initArmorProperties(state: ItemFormBaseStateWithFormSelector) {
    state.armorType = {
        value: ArmorType.Light,
        error: null
    };
    state.material = {
        value: "",
        error: null
    };
    state.requiredStrength = {
        value: null,
        error: null
    };
    state.hasStealthDisadvantage = {
        value: false,
        error: null
    };
    state.maxPossibleDexterityModifier = {
        value: null,
        error: null
    };
    state.armorClass = {
        value: 10,
        error: null
    };
}

function initWeaponProperties(state: ItemFormBaseStateWithFormSelector) {
    state.damageType = {
        value: WeaponDamageType.Ranged,
        error: null
    };
    state.attackType = {
        value: WeaponAttackType.Bludgeoning,
        error: null
    };
    state.proficiencyType = {
        value: WeaponProficiencyType.Simple,
        error: null
    };
    state.normalDistanceInFoots = {
        value: undefined,
        error: null
    };
    state.criticalDistanceInFoots = {
        value: undefined,
        error: null
    };
    state.properties = {
        value: undefined,
        error: null
    };   
    state.hitDice = {
        value: Dice.OneD1,
        error: null
    };
    state.alternateHitDice = {
        value: undefined,
        error: null
    };
}

type ValidationFunction<T> = (oldState: ItemFormBaseStateWithFormSelector, value: T) => string | null;

type Validators = {
    [K in keyof ItemFormBaseState]?: ValidationFunction<ItemFormBaseState[K]>;
  }

const requiredError = "Поле обязательно.";
const mustBePositiveOrZeroError = "Поле должно быть больше или равно 0.";
const mustBePositiveError = "Поле должно быть больше 0.";
const onlyIntNumberError = "Только целые числа.";

const validators: Validators = {
    "name": function(_, field) {
        const name = field.value;
        if (!name || name.trim().length == 0) {
            return requiredError;
        }

        return null;
    },
    "weightInPounds": function(_, field) {
        const weight = field.value;

        if (!weight) {
            return requiredError;
        } else if (weight < 0) {
            return mustBePositiveOrZeroError;
        }

        return null;
    },
    "costInGold": function(_, field) {
        const cost = field.value;

        if (!cost) {
            return requiredError;
        } else if (cost < 0) {
            return mustBePositiveOrZeroError;
        }

        return null;
    },

    /* weapons */
    "damageType": function(state, field) {
        if(state.selectedForm != SelectedItemForm.weapon) {
            return null;
        }

        const value = field?.value;
        if (!value) {
            return requiredError;
        }

        return null;
    },
    "attackType": function(state, field) {
        if(state.selectedForm != SelectedItemForm.weapon) {
            return null;
        }

        const value = field?.value;
        if (!value) {
            return requiredError;
        }

        return null;
    },
    "proficiencyType": function(state, field) {
        if(state.selectedForm != SelectedItemForm.weapon) {
            return null;
        }

        const value = field?.value;
        if (!value) {
            return requiredError;
        }

        return null;
    },
    "normalDistanceInFoots": function(state, field) {
        if(state.selectedForm != SelectedItemForm.weapon 
            || state.damageType?.value !== WeaponDamageType.Ranged) {
            return null;
        }

        const value = field?.value;
        if (!value) {
            return requiredError;
        } else if (value <= 0) {
            return mustBePositiveError;
        } else if (isDecimal(value)) {
            return onlyIntNumberError;
        }

        const mayBeCriticalDistance = state.criticalDistanceInFoots?.value;
        if (mayBeCriticalDistance 
            && mayBeCriticalDistance !== null 
            && mayBeCriticalDistance <= value) {
            return "Число должно быть меньше, чем критическая дистанция.";
        }

        return null;
    },
    "criticalDistanceInFoots": function(state, field) {
        if(state.selectedForm != SelectedItemForm.weapon 
            || state.damageType?.value !== WeaponDamageType.Ranged) {
            return null;
        }

        const value = field?.value;
        if (!value) {
            return requiredError;
        } else if (value <= 0) {
            return mustBePositiveError;
        } else if (isDecimal(value)) {
            return onlyIntNumberError;
        }

        const mayBeNormalDistance = state.normalDistanceInFoots?.value;
        if (mayBeNormalDistance 
            && mayBeNormalDistance !== null 
            && mayBeNormalDistance >= value) {
            return "Число должно быть больше, чем минимальная дистанция.";
        }

        return null;
    },
    "hitDice": function(state, field) {
        if(state.selectedForm != SelectedItemForm.weapon) {
            return null;
        }

        const value = field?.value;
        if (!value) {
            return requiredError;
        }

        return null;
    },
    "alternateHitDice": function(state, field) {
        if(state.selectedForm != SelectedItemForm.weapon) {
            return null;
        }

        const value = field?.value;
        const mayBeProperties = state.properties?.value;
        if (!value && mayBeProperties 
            && mayBeProperties.includes(WeaponProperty.Versatile)
        ) {
            return requiredError;
        }

        return null;
    },

    /* armor */
    "armorType": function(state, field) {
        if(state.selectedForm != SelectedItemForm.armor) {
            return null;
        }

        const value = field?.value;
        if (value == undefined) {
            return requiredError;
        }

        return null;
    },
    "material": function(state, field) {
        if(state.selectedForm != SelectedItemForm.armor) {
            return null;
        }

        const value = field?.value;
        if (!value) {
            return requiredError;
        }

        return null;
    },
    "requiredStrength": function(state, field) {
        if(state.selectedForm != SelectedItemForm.armor) {
            return null;
        }

        const value = field?.value;
        if (!value && value !== null) {
            return requiredError;
        } else if (value !== null && value <= 0) {
            return mustBePositiveError;
        } else if (value !== null && isDecimal(value)) {
            return onlyIntNumberError;
        }

        return null;
    },
    "hasStealthDisadvantage": function(state, field) {
        if(state.selectedForm != SelectedItemForm.armor) {
            return null;
        }

        const value = field?.value;
        if (!value) {
            return requiredError;
        }

        return null;
    },
    "maxPossibleDexterityModifier": function(state, field) {
        if(state.selectedForm != SelectedItemForm.armor) {
            return null;
        }

        const value = field?.value;
        if (!value && value !== null) {
            return requiredError;
        } else if (value !== null && value <= 0) {
            return mustBePositiveError;
        } else if (value !== null && isDecimal(value)) {
            return onlyIntNumberError;
        }

        return null;
    },
    "armorClass": function(state, field) {
        if(state.selectedForm != SelectedItemForm.armor) {
            return null;
        }

        const value = field?.value;
        if (!value) {
            return requiredError;
        } else if (value <= 0) {
            return mustBePositiveError;
        } else if (isDecimal(value)) {
            return onlyIntNumberError;
        }

        return null;
    },
};

function reducer(state: ItemFormBaseStateWithFormSelector, action: ItemFormBaseAction):ItemFormBaseStateWithFormSelector  {
    switch (action.type) {
        case ItemFormBaseActionType.resetForm:
            const newState = initialState;
            if (action.newFormType) {
                newState.selectedForm = action.newFormType!;
            }

            return newState;
        case ItemFormBaseActionType.setFormError:
            return {
                ...state,
                formError: action.error,
            };
        
        case ItemFormBaseActionType.selectForm:
            const newSelectFormState = {
                ...state,
                selectedForm: action.form,
            };

            if (action.form == SelectedItemForm.armor) {
                resetWeaponProperties(newSelectFormState);
                initArmorProperties(newSelectFormState);
            } else if (action.form == SelectedItemForm.weapon) {
                resetArmorProperties(newSelectFormState);
                initWeaponProperties(newSelectFormState);
            } else {
                resetWeaponProperties(newSelectFormState);
                resetArmorProperties(newSelectFormState);
            }

            return newSelectFormState;

        case ItemFormBaseActionType.setFormProperty:

            return {
                ...state,
                [action.field]: {
                    value: action.value,
                    error: action.error 
                        ?? validators[action.field]?.(state, {
                            value: action.value,
                            error: state[action.field]?.error ?? null
                        }) 
                        ?? null,
                },
            }

        default:
            return state;
    }

}

function assertDefined<T>(value: T | undefined, name: string): T {
    if (value === undefined) {
        throw new Error(`Missing value for ${name}`);
    }
    return value;
}

function stateToItem(state: ItemFormBaseStateWithFormSelector): Item | null {
    try {
        const base: ItemBase = {
            name: assertDefined(state.name.value, 'name'),
            iconUrl: state.iconBase64.value ?? undefined,
            weightInPounds: assertDefined(state.weightInPounds.value, 'weightInPounds'),
            description: state.description.value ?? undefined,
            costInGold: assertDefined(state.costInGold.value, 'costInGold'),
            tags: state.tags.value && state.tags.value.length > 0 ? state.tags.value : undefined,
        };

        if (state.selectedForm == SelectedItemForm.armor) {
            return {
                ...base,
                armorType: assertDefined(state.armorType?.value, 'armorType'),
                material: assertDefined(state.material?.value, 'material'),
                requiredStrength: state.requiredStrength?.value ?? undefined,
                hasStealthDisadvantage: assertDefined(state.hasStealthDisadvantage?.value, 'hasStealthDisadvantage'),
                maxPossibleDexterityModifier: state.maxPossibleDexterityModifier?.value ?? undefined,
                armorClass: assertDefined(state.armorClass?.value, 'armorClass'),
            };
        } else if (state.selectedForm == SelectedItemForm.weapon) {
            return {
                ...base,
                attackType: assertDefined(state.attackType?.value, 'attackType'),
                proficiencyType: assertDefined(state.proficiencyType?.value, 'proficiencyType'),
                damageType: assertDefined(state.damageType?.value, 'damageType'),
                normalDistanceInFoots: state.normalDistanceInFoots?.value ?? undefined,
                criticalDistanceInFoots: state.criticalDistanceInFoots?.value ?? undefined,
                properties: state.properties?.value && state.properties.value.length > 0 ? state.properties.value : undefined,
                hitDice: assertDefined(state.hitDice?.value, 'hitDice'),
                alternateHitDice: state.alternateHitDice?.value ?? undefined,
            };
        }

        return base;
    } catch {
        return null;
    }
}

function anyError(state: ItemFormBaseStateWithFormSelector): boolean {
  const hasError = (field?: FormField<any>): boolean => field?.error !== null && field?.error !== undefined;

  // Check common props
  if (
    hasError(state.name) ||
    hasError(state.iconBase64) ||
    hasError(state.weightInPounds) ||
    hasError(state.description) ||
    hasError(state.costInGold) ||
    hasError(state.tags)
  ) {
    return true;
  }

  // Check weapon specific props
  if (state.selectedForm === SelectedItemForm.weapon &&
    (
    hasError(state.damageType) ||
    hasError(state.attackType) ||
    hasError(state.proficiencyType) ||
    hasError(state.normalDistanceInFoots) ||
    hasError(state.criticalDistanceInFoots) ||
    hasError(state.properties) ||
    hasError(state.hitDice) ||
    hasError(state.alternateHitDice))
  ) {
    return true;
  }

  // Check armor specific props
  if ( state.selectedForm === SelectedItemForm.armor && (
    hasError(state.armorType) ||
    hasError(state.material) ||
    hasError(state.requiredStrength) ||
    hasError(state.hasStealthDisadvantage) ||
    hasError(state.maxPossibleDexterityModifier) ||
    hasError(state.armorClass))
  ) {
    return true;
  }

  // No errors found
  return false;
}


export default reducer;
export type { ItemFormBaseAction, ItemFormBaseStateWithFormSelector};
export {initialState, ItemFormBaseActionType, SelectedItemForm, stateToItem, anyError};
