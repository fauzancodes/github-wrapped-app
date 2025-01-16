package repository

import (
	"github.com/fauzancodes/github-wrapped-app/app/config"
	"github.com/fauzancodes/github-wrapped-app/app/models"
	"github.com/google/uuid"
)

func CreateData(data models.GWAResult) (models.GWAResult, error) {
	err := config.DB.Create(&data).Error

	return data, err
}

func GetDataByID(id uuid.UUID) (response models.GWAResult, err error) {
	err = config.DB.Where("id = ?", id).First(&response).Error

	return
}

func Updatedata(data models.GWAResult) (models.GWAResult, error) {
	err := config.DB.Save(&data).Error

	return data, err
}
