import { ReactNode, useContext,  createContext, useReducer, Dispatch, useEffect } from "react";
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { tryParseNumber } from "@/shared/utils/parsers";
import TagInput from "@/shared/ui/TagInput";
import { ArmorTypeSelector, WeaponAttackTypeSelector, WeaponDamageTypeSelector, WeaponProficiencyTypeSelector } from "./EnumSelectors";
import WeaponPropertiesAutocomplete from "./WeaponPropertiesAutocomplete ";
import reducer, { initialState, ItemFormBaseAction, ItemFormBaseActionType, ItemFormBaseStateWithFormSelector, SelectedItemForm } from '../model/ItemFormBaseReducer';
import { DiceSelector } from "@/shared/ui/DiceSelector";
import { MuiFileInput } from "mui-file-input";
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { ArmorType, Dice, WeaponAttackType, WeaponDamageType, WeaponProficiencyType, WeaponProperty } from "@/shared/api/gql/graphql";


const ItemFormBaseStateContext = createContext<ItemFormBaseStateWithFormSelector>(initialState);
const ItemFormBaseDispatchContext = createContext<Dispatch<ItemFormBaseAction> | undefined>(undefined);

const ItemFormBaseStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ItemFormBaseStateContext.Provider value={state}>
      <ItemFormBaseDispatchContext.Provider value={dispatch}>
        {children}
      </ItemFormBaseDispatchContext.Provider>
    </ItemFormBaseStateContext.Provider>
  );
};

export { ItemFormBaseStateProvider, ItemFormBaseStateContext, ItemFormBaseDispatchContext };

interface WeaponSpecificBodyProps {
    disabled?: boolean
}

function WeaponSpecificBody({disabled}: WeaponSpecificBodyProps) {
    const state = useContext(ItemFormBaseStateContext);
    const dispatch = useContext(ItemFormBaseDispatchContext);
    
    if (!state || !dispatch) {
        throw new Error('ItemFormBaseBody must be used within a ItemFormBaseStateProvider');
    }

    const setWeaponAttackType = (attackType: WeaponAttackType) => dispatch({
        type: ItemFormBaseActionType.setFormProperty,
        field: "attackType",
        value: attackType,
    });

    const setWeaponProficiencyType = (proficiencyType: WeaponProficiencyType) => dispatch({
        type: ItemFormBaseActionType.setFormProperty,
        field: "proficiencyType",
        value: proficiencyType,
    });

    const setWeaponDamageType = (damageType: WeaponDamageType) => {
        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "damageType",
            value: damageType,
        });

        if (damageType == WeaponDamageType.Ranged) {
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "criticalDistanceInFoots",
                value: null,
            });
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "normalDistanceInFoots",
                value: null,
            });
        }
    };

    const setSelectedProperties = (properties: WeaponProperty[]) => {
        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "properties",
            value: properties
        });

        if (!properties.includes(WeaponProperty.Versatile)) {
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "alternateHitDice",
                value: null,
                error: undefined
            });
        } else if (!state.alternateHitDice!.value) {
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "alternateHitDice",
                value: Dice.OneD1,
                error: undefined
            });
        }
    };

    const setDistance = (strValue: string) => {
        let error: string | undefined;
        strValue = strValue?.trim();
        if (strValue.length == 0) {
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "normalDistanceInFoots",
                value: undefined,
                error: "Поле обязательно."
            });
            return;
        }

        const { success, value } = tryParseNumber(strValue);
        if (!success) {
            error = "Не число.";
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "normalDistanceInFoots",
                value: undefined,
                error
            });
        } else {
            const distance = Math.floor(value!);
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "normalDistanceInFoots",
                value: distance
            });
        }  
    };

    const setCriticalDistance = (strValue: string) => {
        let error: string | undefined;
        strValue = strValue?.trim();
        if (strValue.length == 0) {
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "criticalDistanceInFoots",
                value: undefined,
                error: "Поле обязательно."
            });
            return;
        }

        const { success, value } = tryParseNumber(strValue);
        if (!success) {
            error = "Не число.";
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "criticalDistanceInFoots",
                value: undefined,
                error
            });
        } else {
            const distance = Math.floor(value!);
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "criticalDistanceInFoots",
                value: distance
            });
        }  
    };

    const setDice = (dice: Dice) => {
        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "hitDice",
            value: dice
        });
    }

    const setAlternateDice = (alternateDice: Dice) => {
        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "alternateHitDice",
            value: alternateDice
        });
    }

    return <>
        <Grid item sm={6} xs={6}>
            <WeaponAttackTypeSelector disabled={disabled} required onValueChange={setWeaponAttackType} />
        </Grid>
        <Grid item sm={6} xs={6}>
            <WeaponProficiencyTypeSelector disabled={disabled} required onValueChange={setWeaponProficiencyType} />
        </Grid>
        <Grid item xs={12}>
            <WeaponDamageTypeSelector disabled={disabled} required onValueChange={setWeaponDamageType} />
        </Grid>
        {
            state.damageType?.value === WeaponDamageType.Ranged && 
            <>
                <Grid item sm={6} xs={6}>
                    <TextField
                      disabled={disabled}
                      value={state.normalDistanceInFoots!.value}
                      onChange={(e) => setDistance(e.target.value)}
                      error={state.normalDistanceInFoots!.error != null}
                      helperText={state.normalDistanceInFoots!.error}
                      fullWidth
                      label="Дистанция"
                      required
                      type="number"
                    />
                </Grid>
                <Grid item sm={6} xs={6}>
                    <TextField
                      disabled={disabled}
                      value={state.criticalDistanceInFoots!.value}
                      error={state.criticalDistanceInFoots!.error != null}
                      helperText={state.criticalDistanceInFoots!.error}
                      fullWidth
                      label="Критическая дистанция"
                      required
                      type="number"
                      onChange={(e) => setCriticalDistance(e.target.value)}
                    />
                </Grid>
            </>
        }
        <Grid item xs={12}>
            <WeaponPropertiesAutocomplete disabled={disabled} selectedProperties={state.properties!.value ?? []} setSelectedProperties={setSelectedProperties}/>
        </Grid>
        <Grid item xs={6} sm={6}>
            <DiceSelector disabled={disabled} id="Hit" selectorLabel="Урон" required value={state.hitDice?.value} onValueChange={setDice}  />
        </Grid>
        <Grid item xs={6} sm={6}>
            { 
                state.properties?.value?.includes(WeaponProperty.Versatile) &&
                 <DiceSelector disabled={disabled} id="AlternateHit" selectorLabel="Алтернативный урон" value={state.alternateHitDice?.value ?? undefined} required onValueChange={setAlternateDice}  />
            }
        </Grid>
    </>
}

interface ArmorSpesificBodyProps {
    disabled?: boolean
}
function ArmorSpesificBody({disabled}: ArmorSpesificBodyProps) {
    const state = useContext(ItemFormBaseStateContext);
    const dispatch = useContext(ItemFormBaseDispatchContext);
    
    if (!state || !dispatch) {
        throw new Error('ItemFormBaseBody must be used within a ItemFormBaseStateProvider');
    }
    const setArmorType = (armorType: ArmorType) => {
        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "armorType",
            value: armorType,
        })
    };

    const handleStealthDisadvantageSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "hasStealthDisadvantage",
            value: event.target.checked,
        });
    }

    const handleRequiredStrengthSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "requiredStrength",
            value: event.target.checked ? 15 : null,
        });
    }

    const handleMaxDexteritySwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "maxPossibleDexterityModifier",
            value: event.target.checked ? 2 : null,
        });
    }

    const setArmorClass = (strValue: string) => {
        let error: string | undefined;
        let ac: number = 15;

        if (strValue.length == 0) {
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "armorClass",
                value: undefined,
                error: "Поле обязательно."
            });
            return;
        }

        const { success, value } = tryParseNumber(strValue);
        if (!success) {
            error = "Не число.";
        } else {
            ac = Math.floor(value!);
            if (ac < 0) {
                error = "Класс доспеха > 0.";
            } else if (ac > 200) {
                error = "Не разумный класс доспеха.";
            }
        }

        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "armorClass",
            value: ac,
            error
        });
    };

    const setMaterial = (str: string) => {
        str = str.trimStart();
        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "material",
            value: str,
            error: str.length == 0 ? "Опишите основной материал." : undefined
        });
    };

    const setMaxDexterity = (strValue: string) => {
        let error: string | undefined;
        let maxDexterity: number | undefined = 2;

        if (strValue.length == 0) {
            error = "Поле обязательно.";
            maxDexterity = undefined;
        } else {
            const { success, value } = tryParseNumber(strValue);
            if (!success) {
                error = "Не число.";
            } else {
                maxDexterity = Math.floor(value!);
                if (maxDexterity < 0) {
                    error = "Ограничение модификатора не должно быть неотрицательным.";
                }
            }
        }

        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "maxPossibleDexterityModifier",
            value: maxDexterity,
            error
        });
    };

    const setRequiredStrength = (strValue: string) => {
        let error: string | undefined;
        let minStrength: number | undefined = 15;

        if (strValue.length == 0) {
            error = "Поле обязательно.";
            minStrength = undefined;
        } else {
            const { success, value } = tryParseNumber(strValue);
            if (!success) {
                error = "Не число.";
            } else {
                minStrength = Math.floor(value!);
                if (minStrength < 0) {
                    error = "Значение должно быть положительным.";
                }
            }
        }

        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "requiredStrength",
            value: minStrength,
            error
        });
    };

    return <>
        <Grid item sm={6} xs={6}>
            <ArmorTypeSelector disabled={disabled} required onValueChange={setArmorType} />
        </Grid>
        <Grid item sm={6} xs={6}>
            <TextField
                disabled={state.armorType!.value === ArmorType.Shield || disabled}
                value={state.armorType!.value === ArmorType.Shield ? 2 : state.armorClass!.value}
                onChange={(e) => setArmorClass(e.target.value)}
                error={state.armorClass!.error != null}
                helperText={state.armorClass!.error}
                fullWidth
                label="Класс доспеха"
                type="number"
                required={state.armorType!.value !== ArmorType.Shield}
            />
        </Grid>
        <Grid item sm={12} xs={12}>
            <TextField
                disabled={disabled}
                value={state.material!.value}
                onChange={(e) => setMaterial(e.target.value)}
                error={state.material!.error != null}
                helperText={state.material!.error}
                fullWidth
                label="Материал"
                required
        />
        </Grid>
        <Grid item sm={12} xs={12}>
            <FormControlLabel
                disabled={disabled}
                control={<Switch
                    disabled={disabled}
                    value={state.hasStealthDisadvantage!.value != null}
                    onChange={handleStealthDisadvantageSwitchChange}
                    color="secondary" />}
                label="Помеха для Скрытности"
                labelPlacement="start"
            />
        </Grid>
        <Grid item sm={12} xs={12}>
            <FormControlLabel
                disabled={disabled}
                control={<Switch 
                    disabled={disabled}
                    value={state.maxPossibleDexterityModifier!.value !== null}
                    onChange={handleMaxDexteritySwitchChange}
                    color="secondary" />}
                label="Установить ограничение по Ловкости."
                labelPlacement="start"
            />
            { state.maxPossibleDexterityModifier!.value !== null && 
                    <TextField
                        disabled={disabled}
                        margin="dense" 
                        value={state.maxPossibleDexterityModifier!.value}
                        onChange={(e) => setMaxDexterity(e.target.value)}
                        error={state.maxPossibleDexterityModifier!.error != null}
                        helperText={state.maxPossibleDexterityModifier!.error}
                        fullWidth
                        label="Макс. модификатор Ловкости"
                        required
                        type="number"
            />}
        </Grid>
        <Grid item sm={12} xs={12}>
            <FormControlLabel
                disabled={disabled}
                control={<Switch 
                    disabled={disabled}
                    value={state.requiredStrength!.value !== null}
                    onChange={handleRequiredStrengthSwitchChange}
                    color="secondary" />}
                label="Установить ограничение по Cиле."
                labelPlacement="start"
            />
            {state.requiredStrength!.value !== null && 
                    <TextField
                        disabled={disabled}
                        margin="dense"
                        value={state.requiredStrength!.value}
                        onChange={(e) => setRequiredStrength(e.target.value)}
                        error={state.requiredStrength!.error != null}
                        helperText={state.requiredStrength!.error}
                        fullWidth
                        label="Необходимая Сила"
                        required
                        type="number"
            />}
        </Grid>
    </>
}

interface ItemFormBaseBodyProps {
    disabled?: boolean
}

export function ItemFormBaseBody({disabled=false}: ItemFormBaseBodyProps) {
    const state = useContext(ItemFormBaseStateContext);
    const dispatch = useContext(ItemFormBaseDispatchContext);
    if (!state || !dispatch) {
        throw new Error('ItemFormBaseBody must be used within a ItemFormBaseStateProvider');
    }

    const handleFormTypeChange = (newType: string | SelectedItemForm) => dispatch({
        type: ItemFormBaseActionType.selectForm,
        form: typeof newType === "string" ? SelectedItemForm.stuff : newType
    });

    const setTags = (tags: string[]) => dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "tags",
            value: tags
        });

    const setDescription = (description: string | undefined) => dispatch({
        type: ItemFormBaseActionType.setFormProperty,
        field: "description",
        value: description?.trimStart() ?? null
    });

    const setName = (name: string) => {
        let error: string | undefined = undefined;
        if (name.length == 0) {
            error = "Поле обязательно.";
        } else if (name.length > 64) {
            error = "Слишком длинное значение.";
            name = name.substring(0, 64);
        }
        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "name",
            value: name?.trimStart(),
            error
        });
    };

    const setWeight = (strValue: string) => {
        strValue = strValue?.trim();
        if (strValue.length == 0) {
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "weightInPounds",
                value: undefined,
                error: "Поле обязательно."
            });
            return;
        }

        const {success, value} = tryParseNumber(strValue);
        let error: string | undefined;
        let propValue = 0;
        if (!success) {
            error = "Не число.";
        } else {
            propValue = value!;
            if (propValue < 0) {
                propValue = 0;
                error = "Вес не может быть отрицательным.";
            }
        }

        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "weightInPounds",
            value: propValue,
            error
        });
    };

    const setCost = (strValue: string) => {
        strValue = strValue?.trim();
        if (strValue.length == 0) {
            dispatch({
                type: ItemFormBaseActionType.setFormProperty,
                field: "costInGold",
                value: undefined,
                error: "Поле обязательно."
            });
            return;
        }

        const {success, value} = tryParseNumber(strValue);
        let error: string | undefined;
        let propValue = 0;
        if (!success) {
            error = "Не число.";
        } else {
            propValue = value!;
            if (propValue < 0) {
                propValue = 0;
                error = "Стоимость не может быть отрицательной.";
            }
        }

        dispatch({
            type: ItemFormBaseActionType.setFormProperty,
            field: "costInGold",
            value: propValue,
            error
        });
    }

    useEffect(() => {
        dispatch({
            type: ItemFormBaseActionType.resetForm,
            newFormType: SelectedItemForm.stuff,
        })
    }, []);

    return <>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="itemType-select-label">Тип предмета</InputLabel>
                    <Select
                        disabled={disabled}
                        labelId="itemType-select-label"
                        id="itemType-select"
                        value={state.selectedForm}
                        label="Тип предмета"
                        onChange={(e) => handleFormTypeChange(e.target.value)}
                    >
                        <MenuItem value={SelectedItemForm.stuff}>Общее</MenuItem>
                        <MenuItem value={SelectedItemForm.armor}>Броня</MenuItem>
                        <MenuItem value={SelectedItemForm.weapon}>Оружие</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                  disabled={disabled}
                  value={state.name.value}
                  error={state.name.error != null}
                  helperText={state.name.error}
                  onChange={(e) => (setName(e.target.value))}
                  required
                  fullWidth
                  label="Название предмета"
                  autoFocus
                  type="text"
                />
            </Grid>
            <Grid item xs={12}>
                <MuiFileInput 
                    label="Иконка"
                    disabled
                    InputProps={{
                        inputProps: {
                          accept: 'image/*'
                        },
                        startAdornment: <><AttachFileIcon /><Typography>Загрузить иконку</Typography></>
                      }}
                    fullWidth/>
            </Grid>
            <Grid item xs={6} sm={6}>
                <TextField
                  disabled={disabled}
                  value={state.weightInPounds.value}
                  onChange={(e) => setWeight(e.target.value)}
                  error={state.weightInPounds.error != null}
                  helperText={state.weightInPounds.error}
                  fullWidth
                  label="Вес в фунтах"
                  required
                  type="number"
                />
            </Grid>
            <Grid item xs={6} sm={6}>
                <TextField
                  disabled={disabled}
                  value={state.costInGold.value}
                  onChange={(e) => setCost(e.target.value)}
                  error={state.costInGold.error != null}
                  helperText={state.costInGold.error}
                  fullWidth
                  label="Стоимость в золоте"
                  required
                  type="number"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    disabled={disabled}
                    fullWidth
                    multiline  
                    minRows={3} 
                    label="Описание"
                    placeholder="Краткое описание"
                    value={state.description.value ?? ""}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TagInput 
                    disabled={disabled}
                    inputPlaceHolder="Тэги?"
                    tags={state.tags.value ?? []}
                    setTags={setTags}
                />
            </Grid>
            {state.selectedForm == SelectedItemForm.armor && <ArmorSpesificBody/>}
            {state.selectedForm == SelectedItemForm.weapon && <WeaponSpecificBody/>}
    </>
}