package models

import (
	"time"

	"github.com/fauzancodes/github-wrapped-app/app/dto"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type GWAResult struct {
	CustomGormModel
	Username     string            `json:"username" gorm:"column:username;type:varchar(255)"`
	Progress     string            `json:"progress" gorm:"column:progress;type:varchar(10)"`
	Data         string            `json:"-" gorm:"column:data;type:text"`
	DataResponse *dto.ResponseData `json:"data" gorm:"-"`
	StarDate     string            `json:"start_date" gorm:"column:start_date;type:varchar(50)"`
	EndDate      string            `json:"end_date" gorm:"column:end_date;type:varchar(50)"`
	Message      string            `json:"message" gorm:"column:message;type:varchar(255)"`
	Latency      string            `json:"latency" gorm:"column:latency;type:varchar(50)"`
}

func (GWAResult) TableName() string {
	return "gwa_data"
}

type CustomGormModel struct {
	ID        uuid.UUID       `gorm:"type:uuid;column:id;default:uuid_generate_v4();primaryKey" json:"id"`
	CreatedAt time.Time       `json:"-" gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time       `json:"-" gorm:"default:CURRENT_TIMESTAMP"`
	DeletedAt *gorm.DeletedAt `gorm:"index" json:"-"`
}
