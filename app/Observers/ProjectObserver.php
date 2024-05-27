<?php

namespace App\Observers;

use App\Models\Project;
use Sowren\SvgAvatarGenerator\Enums\FontWeight;
use Sowren\SvgAvatarGenerator\Facades\Svg;

class ProjectObserver
{
    public function creating(Project $project)
    {
        $project->avatar = Svg::for($project->name)->asCircle()
            ->setSize(64)
//                        ->setCustomFontUrl('https://api.fontshare.com/v2/css?f[]=kola@400&display=swap')
            ->setFontFamily('Kola')
            ->setFontSize(50)
            ->setFontWeight(FontWeight::SEMIBOLD)
            ->setForeground('#FFFFFF')
            ->setGradientColors(
                ['#1f2937'],
            )
            ->setGradientStops(0, .5, 1)
            ->setGradientRotation(120)
            ->render();
    }
}
